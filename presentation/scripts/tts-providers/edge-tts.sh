#!/usr/bin/env bash
# edge-tts provider — 免费 / 无 API key（微软 Edge TTS 后端）
#
# Install: pip install edge-tts   （或 python -m pip install edge-tts）
# Voices:  python -m edge_tts --list-voices
#   zh-CN-YunxiNeural     男声 · 活泼（默认）
#   zh-CN-YunyangNeural   男声 · 新闻播音风
#   zh-CN-XiaoxiaoNeural  女声 · 温暖
#
# 解析顺序（可用 env 覆盖）：
#   EDGE_TTS_BIN   完整命令（如 "/c/.../python.exe -m edge_tts"）
#   1) PATH 上的 edge-tts
#   2) python -m edge_tts
#   3) 常见 anaconda python 全路径

_EDGE_TTS_RESOLVED=""

_edge_tts_resolve() {
  if [[ -n "${EDGE_TTS_BIN:-}" ]]; then
    _EDGE_TTS_RESOLVED="$EDGE_TTS_BIN"
    return 0
  fi
  if command -v edge-tts >/dev/null 2>&1; then
    _EDGE_TTS_RESOLVED="edge-tts"
    return 0
  fi
  if python -m edge_tts --help >/dev/null 2>&1; then
    _EDGE_TTS_RESOLVED="python -m edge_tts"
    return 0
  fi
  for py in \
    "/c/ProgramData/anaconda3/python.exe" \
    "$LOCALAPPDATA/Programs/Python"/*/python.exe \
    "/c/Python"*/python.exe; do
    if [[ -f "$py" ]] && "$py" -m edge_tts --help >/dev/null 2>&1; then
      _EDGE_TTS_RESOLVED="$py -m edge_tts"
      return 0
    fi
  done
  return 1
}

tts_check() {
  if _edge_tts_resolve; then
    echo "edge-tts via: $_EDGE_TTS_RESOLVED" >&2
    return 0
  fi
  return 1
}

tts_install_help() {
  cat <<'EOF' >&2
edge-tts 未找到。安装（免费，无 API key）：
  pip install edge-tts
若 python 不在 PATH（如 anaconda），用环境变量指定：
  export EDGE_TTS_BIN="/c/ProgramData/anaconda3/python.exe -m edge_tts"
列出音色：
  python -m edge_tts --list-voices
EOF
}

tts_synthesize() {
  local text="$1" out="$2" voice="${3:-zh-CN-YunxiNeural}"
  local attempt
  for attempt in 1 2 3 4; do
    rm -f "$out"
    if $_EDGE_TTS_RESOLVED --text "$text" --voice "$voice" \
        --write-media "$out" >/dev/null 2>&1 \
       && [[ -s "$out" ]] \
       && [[ $(stat -c%s "$out" 2>/dev/null || echo 0) -gt 1000 ]]; then
      return 0
    fi
    rm -f "$out"   # 失败时清掉 edge-tts 留下的 0 字节残留
    sleep 1        # edge-tts 偶发 NoAudioReceived，重试通常即可成功
  done
  rm -f "$out"
  return 1
}

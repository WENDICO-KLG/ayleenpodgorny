#!/bin/zsh
# Verschiebt ChatGPT-Downloads (ayl-ai__<kategorie>__<name>.png) nach assets/images/ai-png/<kategorie>/
cd "$(dirname $0)/.."
for f in ~/Downloads/ayl-ai__*.png(N); do
  b=${f:t}; rest=${b#ayl-ai__}; cat=${rest%%__*}; name=${rest#*__}
  mkdir -p assets/images/ai-png/$cat; mv "$f" assets/images/ai-png/$cat/$name
  mkdir -p /tmp/aylprev; sips -Z 700 -s format jpeg assets/images/ai-png/$cat/$name --out /tmp/aylprev/ai-${name%.png}.jpg >/dev/null
  echo "$cat/$name"
done

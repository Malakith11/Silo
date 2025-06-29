#!/usr/bin/env bash
set -eux

# 1) Make sure sudo works (should already be set by the image feature):
sudo chmod a+rw /var/run/docker.sock

# 2) Fetch & install the Supabase CLI
curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz \
  | tar xz supabase
sudo install -m755 supabase /usr/local/bin/
rm supabase

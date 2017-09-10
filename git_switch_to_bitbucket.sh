ssh-add -D
ssh-add -k ~/.ssh/bitbucket_rsa
git remote rm origin
git remote add origin git@bitbucket.org:j2sdk_ball2/mt-work.git
git fetch
git branch --set-upstream-to=origin/develop develop
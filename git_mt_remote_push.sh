git remote rm origin
git remote add origin git@github.com:moneytable/mtwork.git
git push origin develop
git remote rm origin
git remote add origin git@bitbucket.org:j2sdk_ball2/mt-work.git
git branch --set-upstream-to=origin/develop develop
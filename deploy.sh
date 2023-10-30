if [ -z "$1" ]; then
  echo 'need to provide a return branch name'
  exit 1
fi

git checkout --orphan gh-pages

npm run build

git --work-tree dist add --all

git --work-tree dist commit -m 'Deploy'

git push origin HEAD:gh-pages --force

rm -r dist

git checkout -f "$1"

git branch -D gh-pages

set -e

version=$(node scripts/version.js)

read -p "publish version $version? [y,n] " -n 1 -r res
echo

if [[ $res =~ ^[yY]$ ]]
then
  npm test
  npm run build

  git add -A
  git commit -m "v$version"
  git tag -a v$version -m "v$version"
  git push origin master --tags

  npm publish
else
  echo "operation canceled"
fi

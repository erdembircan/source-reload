set -e

version=$(node scripts/version.js)

read -p "publish version $version? [y,n] " -n 1 -r res
echo

if [[ $res =~ ^[yY]$ ]]
then
  npm test
  npm run build
else
  echo "operation canceled"
fi

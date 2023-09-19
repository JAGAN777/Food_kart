git pull
yarn run build
pm2 delete "food-kart-next-js"
pm2 start npm --name "food-kart-next-js" -- start

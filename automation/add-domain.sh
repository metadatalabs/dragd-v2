#!/bin/bash

# this script provisions a new Certbot certificate for a given domain name.

# get first argument (domain name)
DOMAIN=$1

# return error if no domain name is provided
if [ -z "$DOMAIN" ]
then
    echo "Error: No domain name provided"
    exit 1
fi

# create nginx config file

echo """server {
    server_name $DOMAIN;
    location / {
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header Host \$http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://127.0.0.1:3000;
        proxy_redirect off;
    }
}
""" > /etc/nginx/sites-enabled/$DOMAIN

# provision certificate for new domain
certbot --nginx -d $DOMAIN

# reload nginx
systemctl reload nginx


# use this to get wildcard cert for dra.gd
# certbot --server https://acme-v02.api.letsencrypt.org/directory -d '*.dra.gd --manual --preferred-challenges dns-01 certonly
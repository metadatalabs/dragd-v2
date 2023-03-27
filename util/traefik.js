const fs = require('fs');
const yaml = require('js-yaml');
const cron = require('node-cron');

const domainsFile = 'domains.json';
// const traefikConfigFile = '/etc/traefik/dynamic.yaml';
const traefikConfigFile = 'dynamic.yaml';

function loadDomains() {
    console.log('Reading domains from JSON file...');
    // const data = fs.readFileSync(domainsFile, 'utf8');
    // const domains = JSON.parse(data);
    // console.log('Domains:', domains);
    const data = {
        "domains": [
            {
                "domain": "l.nutter.tools",
                "ip": "127.0.0.1"
            },
            {
                "domain": "prnth.nutter.tools",
                "ip": "127.0.0.1"
            },
            {
                "domain": "nutter.tools",
                "ip": "127.0.0.1"
            }
        ]
    }
    // return JSON.parse(data);
    return data;
}


function generateTraefikConfig(domains) {
    console.log('Generating Traefik configuration...');
    const config = {
        http: {
            routers: {},
            services: {},
            middlewares: {
                'https-redirect': {
                    redirectScheme: {
                        scheme: 'https',
                        permanent: true
                    }
                }
            }
        }
    };
    
    for (const domain of domains["domains"]) {
        console.log(`Adding domain: ${domain.domain} with IP: ${domain.ip}`);
        config.http.routers[`${domain.domain}-router`] = {
            rule: `Host(\`${domain.domain}\`)`,
            service: `${domain.domain}-service`,
            entryPoints: ['http'],
            middlewares: ['https-redirect'],
            tls: {
                certResolver: 'letsencrypt'
            }
        };
        
        config.http.services[`${domain.domain}-service`] = {
            loadBalancer: {
                servers: [
                    {
                        url: `http://${domain.ip}:80`
                    }
                ]
            }
        };
    }
    
    const yamlConfig = yaml.dump(config);
    console.log('Generated Traefik configuration:', yamlConfig);
    return yamlConfig;
}

function updateTraefikConfig() {
    console.log('Updating Traefik configuration...');
    const domains = loadDomains();
    const config = generateTraefikConfig(domains);
    fs.writeFileSync(traefikConfigFile, config, 'utf8');
    console.log('Traefik configuration updated successfully.');
}

// Update the Traefik configuration immediately
updateTraefikConfig();

// Schedule a task to update the Traefik configuration every 5 minutes
cron.schedule('*/5 * * * *', () => {
    console.log('Cron job triggered: Updating Traefik configuration...');
    updateTraefikConfig();
});
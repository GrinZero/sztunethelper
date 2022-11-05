import dns from 'dns'

const getDnsServer = () => dns.getServers().filter((server) => server !== '127.0.0.1')

export default getDnsServer

import * as url from 'url';

const config = {
    SERVER: "atlas",
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    MONGODB_URI: "mongodb+srv://FOlariaga:QNxt9FsbrAm0XFHz@clustercoder53160fo.hnz3aid.mongodb.net/ecommerce",
    SECRET: 'FOlariaga_53160',
    GITHUB_CLIENT_ID: "Iv23liWOIlrFq5JpIZH2",
    GITHUB_CLIENT_SECRET: "13c1b5d0111c1dfcade8640e478d9408aea3dd3c",
    GITHUB_CALLBACK_URL : "http://localhost:8080/api/sessions/ghlogincallback"
}

export default config;
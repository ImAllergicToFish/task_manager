import express from 'express';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import swagger from 'swagger-ui-dist';

export default function setupSwaggerUI(app: express.Application) {
    const serveSwaggerDef = function serveSwaggerDef(req: Request, res: Response) {
        res.sendFile(path.resolve(__dirname + '/../documentation/openapi.json'));
    };

    app.get('/documentation-config', serveSwaggerDef);

    const swaggerUiAssetPath = swagger.getAbsoluteFSPath();
    const swaggerFiles = express.static(swaggerUiAssetPath);

    const urlRegex = /url: "[^"]*",/;

    const patchIndex = function patchIndex(req: Request, res: Response) {
        const indexContent = fs
            .readFileSync(`${swaggerUiAssetPath}/index.html`)
            .toString()
            .replace(urlRegex, 'url: "../documentation-config",');
        res.send(indexContent);
    };

    app.get('/documentation', function getSwaggerRoot(req: Request, res: Response) {
        let targetUrl = req.originalUrl;
        if (!targetUrl.endsWith('/')) {
            targetUrl += '/';
        }
        targetUrl += 'index.html';
        res.redirect(targetUrl);
    });

    app.get('/documentation/index.html', patchIndex);

    app.use('/documentation', swaggerFiles);
}

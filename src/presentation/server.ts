import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  public_path?: string;
  router: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;

  constructor(options: Options) {
    const { port, public_path = "public", router } = options;
    this.port = port;
    this.publicPath = public_path;
    this.router = router;
  }

  async start() {
    //* Middlewares

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routez
    this.app.use(this.router);

    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`,
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

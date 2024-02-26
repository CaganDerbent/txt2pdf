import express, { Request, Response, NextFunction } from "express";
import multer, { Multer } from "multer";
import fs from "fs";
import pdf, { file } from "pdfkit";
import cors from "cors"



const app:any = express();
const port :number= 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage :any = multer.memoryStorage();
const upload :any= multer({ storage: storage });

app.use(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.path,req.method);
    next();
});

app.listen(port, () => console.log(`Server running on ${port}`));

app.get("/", async (req: Request, res: Response) => {
    res.json("merhaba");
});

app.post("/txt2pdf", upload.single('txtFile'), async (req: Request, res: Response) => {

    const filepath: string = './uploads/converted.pdf'

    const txtData: any = req.file?.buffer.toString();

    console.log(txtData)

    const pdfStream: any = fs.createWriteStream(filepath);

    const doc: any = new pdf(); 

    doc.pipe(pdfStream);
    doc.text(txtData);
    doc.end();

    

    pdfStream.on('finish', () => {
      res.download(filepath, 'converted.pdf', (err) => {
          if (err) {
              console.error(err);
              res.status(500).send('Server Error');
          } else {
              console.log("success");
              //fs.unlinkSync(filepath);
          }
      });
  });
});


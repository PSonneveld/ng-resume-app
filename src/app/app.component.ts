import { Component, OnInit } from "@angular/core";
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "CodeSandbox";
  pdf: jsPDF;
  pdfSrc: any;
  pdfPage = 1;

  async ngOnInit() {
    window["html2canvas"] = html2canvas;
    const html = await (await fetch("../assets/template.html")).text();

    this.pdf = new jsPDF({
      unit: "pt",
      format: "a4",
      orientation: "portrait"
    });

    this.pdf.html(html, {
      html2canvas: {
        scale: 0.5
      },
      callback: result => {
        this.pdfSrc = result.output("arraybuffer");
      }
    });
  }
}

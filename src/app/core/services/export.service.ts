import { Injectable } from '@angular/core';
import { Workout } from '../models';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToCSV(workouts: Workout[]): void {
    const headers = ['Name', 'Date', 'Notes'];
    const rows = workouts.map(w => [
      w.name,
      new Date(w.date).toLocaleDateString(),
      w.notes || ''
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workouts.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  exportToPDF(workouts: Workout[]): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('My Workouts', 14, 20);
    doc.setFontSize(11);
    doc.text(`Exported on ${new Date().toLocaleDateString()}`, 14, 28);

    const tableData = workouts.map(w => [
      w.name,
      new Date(w.date).toLocaleDateString(),
      w.notes || ''
    ]);

    autoTable(doc, {
    head: [['Name', 'Date', 'Notes']],
    body: tableData,
    startY: 35
    });

    doc.save('workouts.pdf');
  }

}

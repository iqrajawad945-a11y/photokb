/**
 * Generates lightweight, realistic sample images entirely via browser canvas
 * so users and automated tests can test the compressor with one click.
 */

export function createSamplePhotoFile(): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d')!;

    // Background gradient (typical passport / portrait backdrop)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1000);
    bgGrad.addColorStop(0, '#CBD5E1');
    bgGrad.addColorStop(1, '#94A3B8');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 1000);

    // Subtle grid/studio texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let x = 0; x < 800; x += 20) {
      ctx.fillRect(x, 0, 1, 1000);
    }

    // Shoulders
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.ellipse(400, 950, 320, 220, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shirt collar
    ctx.fillStyle = '#F8FAFC';
    ctx.beginPath();
    ctx.moveTo(330, 800);
    ctx.lineTo(400, 920);
    ctx.lineTo(470, 800);
    ctx.closePath();
    ctx.fill();

    // Neck
    ctx.fillStyle = '#E2B89B';
    ctx.fillRect(350, 650, 100, 180);

    // Head / Face
    ctx.fillStyle = '#ECC3A7';
    ctx.beginPath();
    ctx.ellipse(400, 520, 160, 200, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#262626';
    ctx.beginPath();
    ctx.arc(400, 440, 175, Math.PI, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.arc(340, 510, 10, 0, Math.PI * 2);
    ctx.arc(460, 510, 10, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(315, 485);
    ctx.quadraticCurveTo(340, 475, 365, 485);
    ctx.moveTo(435, 485);
    ctx.quadraticCurveTo(460, 475, 485, 485);
    ctx.stroke();

    // Nose
    ctx.strokeStyle = '#D99B77';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(400, 510);
    ctx.lineTo(395, 560);
    ctx.lineTo(415, 560);
    ctx.stroke();

    // Gentle smile
    ctx.strokeStyle = '#B96B57';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(400, 600, 30, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Header badge watermark text
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Sample Portrait — PhotoKB Test', 400, 80);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'sample_passport_photo.jpg', {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        resolve(file);
      }
    }, 'image/jpeg', 0.95);
  });
}

export function createSampleSignatureFile(): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 450;
    const ctx = canvas.getContext('2d')!;

    // Clean white background (typical scanned paper)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 900, 450);

    // Subtle paper guide line
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 320);
    ctx.lineTo(820, 320);
    ctx.stroke();

    // Signature ink strokes
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    // Flowing cursive initials
    ctx.moveTo(120, 240);
    ctx.bezierCurveTo(140, 120, 210, 110, 230, 230);
    ctx.bezierCurveTo(240, 290, 270, 330, 310, 260);
    ctx.bezierCurveTo(340, 190, 380, 180, 410, 250);
    // Middle loops
    ctx.bezierCurveTo(430, 300, 460, 310, 490, 240);
    ctx.bezierCurveTo(510, 190, 540, 200, 570, 260);
    // End flourish and underline
    ctx.bezierCurveTo(620, 340, 700, 220, 760, 200);
    ctx.stroke();

    // Underline stroke flourish
    ctx.beginPath();
    ctx.moveTo(160, 300);
    ctx.quadraticCurveTo(450, 340, 740, 280);
    ctx.stroke();

    // Dot
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(770, 260, 5, 0, Math.PI * 2);
    ctx.fill();

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'sample_signature_scan.png', {
          type: 'image/png',
          lastModified: Date.now(),
        });
        resolve(file);
      }
    }, 'image/png');
  });
}

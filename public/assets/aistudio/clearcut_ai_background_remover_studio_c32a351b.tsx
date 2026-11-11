import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Scissors, Sparkles, Upload, Image as ImageIcon, Download, Sliders,
  Brush, Eraser, Undo2, Redo2, ZoomIn, ZoomOut, RotateCcw, Layers,
  Check, Copy, Globe, Moon, Sun, ShieldCheck, Zap, Code, HelpCircle,
  CreditCard, FolderPlus, Trash2, Play, Eye, SplitSquareVertical,
  Columns, Maximize2, CheckCircle2, AlertCircle, Link2, Clipboard,
  Terminal, Key, RefreshCw, Award, FileCheck, Crop, Move, Palette,
  UserCheck, Package, Car, Type, FlipHorizontal, FlipVertical,
  SunMedium, Contrast, Compass, Wand2, Box, Grid, Sparkle
} from 'lucide-react';

// ============================================================================
// BILINGUAL TRANSLATIONS (English & বাংলা) - PRO STUDIO EDITION
// ============================================================================
const TRANSLATIONS = {
  en: {
    brand: 'ClearCut AI Pro',
    privacyBadge: 'WebGPU Neural Engine + Multi-Pass Alpha Matting • 100% On-Device Privacy',
    nav: {
      studio: 'Photoroom Studio',
      batch: 'Batch Studio',
      pricing: 'Plans & bKash/Stripe',
      api: 'Developer API',
      faq: 'Architecture',
    },
    hero: {
      title: 'Pro AI Background Remover & Virtual Product Studio',
      subtitle: 'Built like Photoroom Pro & remove.bg. Instant hair-level alpha matting, 3D studio podium scenes, floor contact shadows, and depth-text behind subjects.',
      dropTitle: 'Drop image here or click to upload',
      dropSub: 'JPG, PNG, WebP up to 25MB • Press Ctrl+V to paste directly',
      trySamples: 'Instant 1-Click HD Studio Samples:',
      urlPlaceholder: 'Paste direct image URL...',
      loadUrl: 'Import URL',
      pasteBtn: 'Paste (Ctrl+V)',
    },
    samples: {
      portrait: 'Model Portrait (Hair)',
      sneaker: 'Pro Sneaker',
      perfume: 'Luxury Perfume',
      passport: 'Passport Biometric',
      car: 'Sports Car',
    },
    tabs: {
      templates: 'AI Studio Scenes',
      refine: 'Magic Brush & Mask',
      transform: 'Transform & Text',
      effects: '3D Shadow & Relight',
      crop: 'Size & Passport',
    },
    editor: {
      viewCompare: 'Swipe Compare',
      viewSide: 'Side-by-Side',
      viewResult: 'Studio Canvas',
      viewMask: 'B&W Alpha Mask',
      viewRuby: 'Red Rubylith',
      autoCenter: 'Auto-Fit & Center Subject',
      resetAll: 'Reset Edits',
      exportBtn: 'Download High-Res Render',
    },
    batch: {
      title: 'Commercial Batch Processing Queue',
      subtitle: 'Process dozens of e-commerce products with a unified background template or transparent PNG in one click.',
      loadSampleBatch: 'Load 5 E-Commerce Sample Products',
      processAll: 'Run Batch AI Pipeline',
      presetLabel: 'Batch Output Preset:',
    },
    pricing: {
      title: 'Commercial Plans & Local Payment Gateways',
      subtitle: 'Instant checkout with bKash, Nagad, SSLCommerz (BDT ৳) or Stripe Global (USD $).',
    }
  },
  bn: {
    brand: 'ক্লিয়ারকাট এআই প্রো',
    privacyBadge: 'WebGPU নিউরাল ইঞ্জিন + আলফা ম্যাটিং • ১০০% প্রাইভেসি ও অন-ডিভাইস প্রসেসিং',
    nav: {
      studio: 'ফটোরুম স্টুডিও',
      batch: 'ব্যাচ প্রসেসিং',
      pricing: 'প্যাকেজ ও বিকাশ পেমেন্ট',
      api: 'ডেভেলপার এপিআই',
      faq: 'আর্কিটেকচার',
    },
    hero: {
      title: 'অ্যাডভান্সড এআই ব্যাকগ্রাউন্ড রিমুভার এবং প্রোডাক্ট স্টুডিও',
      subtitle: 'Photoroom Pro এবং remove.bg-এর আদলে তৈরি। নিখুঁত চুলের ডিটেইল, থ্রিডি প্রোডাক্ট পডিয়াম, ফ্লোর শ্যাডো, স্টিকার বর্ডার এবং ছবির পেছনে থ্রিডি টেক্সট ইফেক্ট।',
      dropTitle: 'ছবি এখানে ড্র্যাগ করুন অথবা ক্লিক করে আপলোড করুন',
      dropSub: 'JPG, PNG, WebP (সর্বোচ্চ ২৫ এমবি) • সরাসরি পেস্ট করতে Ctrl+V চাপুন',
      trySamples: '১-ক্লিকে এইচডি স্যাম্পল টেস্ট করুন:',
      urlPlaceholder: 'ছবির ডিরেক্ট লিংক দিন...',
      loadUrl: 'লিংক লোড',
      pasteBtn: 'পেস্ট (Ctrl+V)',
    },
    samples: {
      portrait: 'মডেল পোর্ট্রেট (চুল)',
      sneaker: 'ই-কমার্স জুতো',
      perfume: 'লাক্সারি পারফিউম',
      passport: 'পাসপোর্ট ছবি',
      car: 'স্পোর্টস কার',
    },
    tabs: {
      templates: 'এআই স্টুডিও সিন',
      refine: 'ম্যাজিক ব্রাশ ও মাস্ক',
      transform: 'পজিশন ও টেক্সট',
      effects: 'থ্রিডি শ্যাডো ও কালার',
      crop: 'সাইজ ও পাসপোর্ট',
    },
    editor: {
      viewCompare: 'স্লাইডার তুলনা',
      viewSide: 'পাশাপাশি ভিউ',
      viewResult: 'স্টুডিও ক্যানভাস',
      viewMask: 'সাদা-কালো মাস্ক',
      viewRuby: 'রেড রুবিলিথ মাস্ক',
      autoCenter: 'অটো-সেন্টার ও ফিট',
      resetAll: 'সব রিসেট করুন',
      exportBtn: 'হাই-রেজোলিউশন ডাউনলোড করুন',
    },
    batch: {
      title: 'ই-কমার্স ব্যাচ প্রসেসিং স্টুডিও',
      subtitle: 'একসাথে অনেকগুলো প্রোডাক্ট বা পাসপোর্ট ছবির ব্যাকগ্রাউন্ড রিমুভ এবং টেমপ্লেট অ্যাপ্লাই করুন।',
      loadSampleBatch: '৫টি স্যাম্পল প্রোডাক্ট লোড করুন',
      processAll: 'সবগুলো প্রসেস করুন',
      presetLabel: 'ব্যাচ আউটপুট প্রিসেট:',
    },
    pricing: {
      title: 'প্রফেশনাল প্যাকেজ এবং পেমেন্ট গেটওয়ে',
      subtitle: 'বিকাশ (bKash), নগদ (Nagad), SSLCommerz (৳) অথবা আন্তর্জাতিক কার্ডের (Stripe) মাধ্যমে পেমেন্ট করুন।',
    }
  }
};

// ============================================================================
// PHOTOROOM-STYLE STUDIO SCENE TEMPLATES (PROCEDURAL BACKDROP RENDERER)
// ============================================================================
const STUDIO_TEMPLATES = [
  { id: 'transparent', name: 'Transparent Cutout', nameBn: 'ট্রান্সপারেন্ট PNG', badge: 'PNG' },
  { id: 'podium_marble', name: '3D Marble Podium', nameBn: 'থ্রিডি মার্বেল পডিয়াম', badge: '3D Pro' },
  { id: 'sunlit_wood', name: 'Sunlit Studio Floor', nameBn: 'সানলাইট উড স্টুডিও', badge: 'Warm' },
  { id: 'cyber_neon', name: 'Cyberpunk Neon Stage', nameBn: 'সাইবারপাঙ্ক নিয়ন', badge: 'Glow' },
  { id: 'pastel_cosmetic', name: 'Pastel Silk Cyclorama', nameBn: 'প্যাস্টেল কসমেটিক সিন', badge: 'Soft' },
  { id: 'amazon_white', name: 'Pure White E-Commerce', nameBn: 'অ্যামাজন/দারাজ হোয়াইট', badge: 'Seller' },
  { id: 'passport_blue', name: 'Official Passport Blue', nameBn: 'পাসপোর্ট ব্লু (৩৫×৪৫মিমি)', badge: 'ICAO' },
  { id: 'youtube_burst', name: 'Viral Thumbnail Burst', nameBn: 'ইউটিউব থাম্বনেইল বার্স্ট', badge: 'Creator' },
];

function drawStudioTemplateBackdrop(ctx, templateId, width, height, customColor, customGradAngle) {
  ctx.save();
  if (templateId === 'amazon_white') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    // Subtle studio floor horizon gradient
    const floorGrad = ctx.createLinearGradient(0, height * 0.68, 0, height);
    floorGrad.addColorStop(0, '#ffffff');
    floorGrad.addColorStop(0.2, '#f1f5f9');
    floorGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, height * 0.68, width, height * 0.32);
  } else if (templateId === 'podium_marble') {
    // Soft luxury studio wall
    const wallGrad = ctx.createRadialGradient(width * 0.5, height * 0.35, 30, width * 0.5, height * 0.45, width * 0.85);
    wallGrad.addColorStop(0, '#f8fafc');
    wallGrad.addColorStop(0.6, '#cbd5e1');
    wallGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, width, height);

    // Floor horizon
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, height * 0.72, width, height * 0.28);

    // 3D Cylindrical Marble Pedestal / Podium under the product
    const cx = width * 0.5;
    const py = height * 0.77;
    const rx = width * 0.34;
    const ry = height * 0.065;
    const pillarH = height * 0.16;

    // Podium cast shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.22)';
    ctx.beginPath();
    ctx.ellipse(cx + 15, py + pillarH + 6, rx * 1.06, ry * 1.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Podium cylinder body
    const bodyGrad = ctx.createLinearGradient(cx - rx, py, cx + rx, py);
    bodyGrad.addColorStop(0, '#94a3b8');
    bodyGrad.addColorStop(0.25, '#f1f5f9');
    bodyGrad.addColorStop(0.6, '#e2e8f0');
    bodyGrad.addColorStop(1, '#64748b');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(cx - rx, py);
    ctx.lineTo(cx - rx, py + pillarH);
    ctx.ellipse(cx, py + pillarH, rx, ry, 0, Math.PI, 0, true);
    ctx.lineTo(cx + rx, py);
    ctx.closePath();
    ctx.fill();

    // Podium top surface
    const topGrad = ctx.createLinearGradient(cx - rx, py - ry, cx + rx, py + ry);
    topGrad.addColorStop(0, '#ffffff');
    topGrad.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = topGrad;
    ctx.beginPath();
    ctx.ellipse(cx, py, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (templateId === 'sunlit_wood') {
    // Warm sunlit plaster wall
    const wall = ctx.createLinearGradient(0, 0, width, height * 0.72);
    wall.addColorStop(0, '#fef3c7');
    wall.addColorStop(1, '#fde68a');
    ctx.fillStyle = wall;
    ctx.fillRect(0, 0, width, height * 0.72);

    // Diagonal window blind sunbeams
    ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
    for (let i = -2; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 130, 0);
      ctx.lineTo(i * 130 + 65, 0);
      ctx.lineTo(i * 130 + 260, height * 0.72);
      ctx.lineTo(i * 130 + 195, height * 0.72);
      ctx.closePath();
      ctx.fill();
    }

    // Wooden tabletop / studio floor
    const wood = ctx.createLinearGradient(0, height * 0.72, 0, height);
    wood.addColorStop(0, '#b45309');
    wood.addColorStop(0.15, '#92400e');
    wood.addColorStop(1, '#78350f');
    ctx.fillStyle = wood;
    ctx.fillRect(0, height * 0.72, width, height * 0.28);
  } else if (templateId === 'cyber_neon') {
    // Dark futuristic studio
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#090d16');
    bg.addColorStop(0.5, '#1e1b4b');
    bg.addColorStop(1, '#0f172a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Dual neon studio rim glow circles
    const cyanGlow = ctx.createRadialGradient(width * 0.22, height * 0.4, 10, width * 0.22, height * 0.4, width * 0.48);
    cyanGlow.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
    cyanGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = cyanGlow;
    ctx.fillRect(0, 0, width, height);

    const pinkGlow = ctx.createRadialGradient(width * 0.78, height * 0.45, 10, width * 0.78, height * 0.45, width * 0.48);
    pinkGlow.addColorStop(0, 'rgba(236, 72, 153, 0.45)');
    pinkGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = pinkGlow;
    ctx.fillRect(0, 0, width, height);

    // Reflective neon grid floor
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1.5;
    const horizon = height * 0.73;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(width, horizon);
    ctx.stroke();
    for (let i = -6; i <= 6; i++) {
      ctx.beginPath();
      ctx.moveTo(width * 0.5 + i * 35, horizon);
      ctx.lineTo(width * 0.5 + i * 165, height);
      ctx.stroke();
    }
  } else if (templateId === 'pastel_cosmetic') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fce7f3');
    grad.addColorStop(0.5, '#f3e8ff');
    grad.addColorStop(1, '#e0e7ff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Soft pastel arch in background
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.46, width * 0.28, Math.PI, 0);
    ctx.lineTo(width * 0.78, height * 0.76);
    ctx.lineTo(width * 0.22, height * 0.76);
    ctx.closePath();
    ctx.fill();

    // Soft podium
    ctx.fillStyle = '#fbcfe8';
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.78, width * 0.32, height * 0.055, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (templateId === 'passport_blue') {
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(0, 0, width, height);
  } else if (templateId === 'youtube_burst') {
    const cx = width * 0.5;
    const cy = height * 0.5;
    const rad = ctx.createRadialGradient(cx, cy, 20, cx, cy, width * 0.75);
    rad.addColorStop(0, '#facc15');
    rad.addColorStop(0.45, '#f97316');
    rad.addColorStop(1, '#991b1b');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, width, height);

    // Comic radial burst rays
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    for (let i = 0; i < 24; i++) {
      if (i % 2 === 0) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const a1 = (i / 24) * Math.PI * 2;
        const a2 = ((i + 1) / 24) * Math.PI * 2;
        ctx.lineTo(Math.cos(a1) * width, Math.sin(a1) * height);
        ctx.lineTo(Math.cos(a2) * width, Math.sin(a2) * height);
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.restore();
  }
  ctx.restore();
}

// ============================================================================
// PROCEDURAL 5-SCENE HD SAMPLE GENERATOR (WITH PERFUME BOTTLE ADDED)
// ============================================================================
function generateSampleScene(type, width = 760, height = 760) {
  const fullCanvas = document.createElement('canvas');
  fullCanvas.width = width;
  fullCanvas.height = height;
  const ctx = fullCanvas.getContext('2d');

  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = width;
  maskCanvas.height = height;
  const mCtx = maskCanvas.getContext('2d');

  // 1. Draw complex realistic outdoor/indoor original background
  if (type === 'portrait') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#1e293b');
    grad.addColorStop(0.5, '#334155');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    const bokehColors = ['#f59e0b', '#38bdf8', '#f43f5e', '#a855f7', '#34d399'];
    for (let i = 0; i < 48; i++) {
      ctx.save();
      ctx.beginPath();
      const x = (Math.sin(i * 78.233) * 0.5 + 0.5) * width;
      const y = (Math.cos(i * 45.164) * 0.5 + 0.5) * height;
      const r = 16 + (i % 6) * 14;
      ctx.fillStyle = bokehColors[i % bokehColors.length];
      ctx.globalAlpha = 0.24;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  } else if (type === 'sneaker') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.65, '#64748b');
    grad.addColorStop(0.66, '#475569');
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (type === 'perfume') {
    // Busy botanical leaves & textured stone background
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#064e3b');
    bg.addColorStop(1, '#115e59');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(52, 211, 153, 0.15)' : 'rgba(251, 191, 36, 0.12)';
      ctx.beginPath();
      ctx.ellipse((i * 73) % width, (i * 59) % height, 60, 22, i * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'passport') {
    ctx.fillStyle = '#d6d3d1';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#bae6fd';
    ctx.fillRect(55, 65, 180, 240);
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 8;
    ctx.strokeRect(55, 65, 180, 240);
  } else {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#38bdf8');
    sky.addColorStop(0.55, '#bae6fd');
    sky.addColorStop(0.56, '#44403c');
    sky.addColorStop(1, '#1c1917');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Draw Subject on both Full Canvas and Alpha Mask Canvas
  const drawSubject = (targetCtx, isMask) => {
    targetCtx.save();
    const cx = width * 0.5;
    const cy = height * 0.48;

    if (type === 'portrait') {
      // Hair mass
      targetCtx.fillStyle = isMask ? '#ffffff' : '#181311';
      targetCtx.beginPath();
      targetCtx.arc(cx, cy - 35, 150, 0, Math.PI * 2);
      targetCtx.fill();

      // Fine flyaway hair strands around perimeter
      for (let a = 0; a < 110; a++) {
        const angle = (a / 110) * Math.PI * 2;
        const len = 148 + Math.sin(a * 7) * 28 + Math.cos(a * 13) * 15;
        targetCtx.beginPath();
        targetCtx.lineWidth = isMask ? 3.0 : 2.4;
        targetCtx.strokeStyle = isMask
          ? 'rgba(255,255,255,0.92)'
          : a % 3 === 0 ? '#451a03' : '#1c1917';
        targetCtx.moveTo(cx + Math.cos(angle) * 118, (cy - 35) + Math.sin(angle) * 118);
        targetCtx.quadraticCurveTo(
          cx + Math.cos(angle + 0.08) * (len * 0.9),
          (cy - 35) + Math.sin(angle + 0.08) * (len * 0.9),
          cx + Math.cos(angle - 0.04) * len,
          (cy - 35) + Math.sin(angle - 0.04) * len
        );
        targetCtx.stroke();
      }

      // Blazer & Shoulders
      targetCtx.beginPath();
      targetCtx.moveTo(cx - 215, height * 0.88);
      targetCtx.quadraticCurveTo(cx - 190, cy + 115, cx, cy + 115);
      targetCtx.quadraticCurveTo(cx + 190, cy + 115, cx + 215, height * 0.88);
      targetCtx.closePath();
      if (isMask) {
        targetCtx.fillStyle = '#ffffff';
      } else {
        const jGrad = targetCtx.createLinearGradient(cx - 180, cy + 115, cx + 180, height * 0.88);
        jGrad.addColorStop(0, '#6366f1');
        jGrad.addColorStop(1, '#312e81');
        targetCtx.fillStyle = jGrad;
      }
      targetCtx.fill();

      // Neck & Face
      targetCtx.fillStyle = isMask ? '#ffffff' : '#f1c27d';
      targetCtx.fillRect(cx - 38, cy + 45, 76, 90);
      targetCtx.beginPath();
      targetCtx.ellipse(cx, cy - 20, 90, 114, 0, 0, Math.PI * 2);
      targetCtx.fill();

      if (!isMask) {
        targetCtx.fillStyle = '#0f172a';
        targetCtx.beginPath();
        targetCtx.arc(cx - 32, cy - 26, 9, 0, Math.PI * 2);
        targetCtx.arc(cx + 32, cy - 26, 9, 0, Math.PI * 2);
        targetCtx.fill();

        targetCtx.strokeStyle = '#f59e0b';
        targetCtx.lineWidth = 4;
        targetCtx.strokeRect(cx - 65, cy - 46, 54, 38);
        targetCtx.strokeRect(cx + 11, cy - 46, 54, 38);
        targetCtx.beginPath();
        targetCtx.moveTo(cx - 11, cy - 28);
        targetCtx.lineTo(cx + 11, cy - 28);
        targetCtx.stroke();

        targetCtx.strokeStyle = '#e11d48';
        targetCtx.lineWidth = 5;
        targetCtx.beginPath();
        targetCtx.arc(cx, cy + 18, 26, 0.15 * Math.PI, 0.85 * Math.PI);
        targetCtx.stroke();
      }
    } else if (type === 'sneaker') {
      targetCtx.translate(cx, cy + 30);
      targetCtx.rotate(-0.1);

      // Rubber Outsole
      targetCtx.beginPath();
      targetCtx.roundRect(-245, 65, 490, 54, 24);
      targetCtx.fillStyle = isMask ? '#ffffff' : '#f8fafc';
      targetCtx.fill();

      // Sneaker Upper
      targetCtx.beginPath();
      targetCtx.moveTo(-230, 68);
      targetCtx.lineTo(-195, -140);
      targetCtx.quadraticCurveTo(-95, -160, -35, -75);
      targetCtx.lineTo(200, 10);
      targetCtx.quadraticCurveTo(250, 32, 235, 68);
      targetCtx.closePath();

      if (isMask) {
        targetCtx.fillStyle = '#ffffff';
        targetCtx.fill();
      } else {
        const sGrad = targetCtx.createLinearGradient(-220, -140, 220, 70);
        sGrad.addColorStop(0, '#ef4444');
        sGrad.addColorStop(0.58, '#dc2626');
        sGrad.addColorStop(1, '#0f172a');
        targetCtx.fillStyle = sGrad;
        targetCtx.fill();

        targetCtx.fillStyle = '#fbbf24';
        targetCtx.beginPath();
        targetCtx.moveTo(-125, -10);
        targetCtx.quadraticCurveTo(-10, 48, 140, 25);
        targetCtx.quadraticCurveTo(10, 75, -140, 25);
        targetCtx.closePath();
        targetCtx.fill();

        targetCtx.strokeStyle = '#ffffff';
        targetCtx.lineWidth = 7;
        for (let i = 0; i < 5; i++) {
          targetCtx.beginPath();
          targetCtx.moveTo(-25 + i * 32, -62 + i * 16);
          targetCtx.lineTo(2 + i * 32, -32 + i * 16);
          targetCtx.stroke();
        }
      }
    } else if (type === 'perfume') {
      // Luxury Glass Perfume Bottle
      targetCtx.translate(cx, cy + 25);

      // Gold Spray Cap
      targetCtx.fillStyle = isMask ? '#ffffff' : '#f59e0b';
      targetCtx.beginPath();
      targetCtx.roundRect(-48, -225, 96, 65, 10);
      targetCtx.fill();

      // Bottle Neck Collar
      targetCtx.fillStyle = isMask ? '#ffffff' : '#fcd34d';
      targetCtx.fillRect(-32, -160, 64, 24);

      // Faceted Glass Flacon Body
      targetCtx.beginPath();
      targetCtx.roundRect(-135, -136, 270, 310, 32);
      if (isMask) {
        targetCtx.fillStyle = '#ffffff';
        targetCtx.fill();
      } else {
        const glassGrad = targetCtx.createLinearGradient(-135, -136, 135, 174);
        glassGrad.addColorStop(0, '#fde68a');
        glassGrad.addColorStop(0.35, '#f59e0b');
        glassGrad.addColorStop(0.75, '#d97706');
        glassGrad.addColorStop(1, '#78350f');
        targetCtx.fillStyle = glassGrad;
        targetCtx.fill();
        targetCtx.lineWidth = 6;
        targetCtx.strokeStyle = 'rgba(255,255,255,0.65)';
        targetCtx.stroke();

        // Center Luxury Emblem Label
        targetCtx.fillStyle = '#0f172a';
        targetCtx.fillRect(-82, -55, 164, 125);
        targetCtx.strokeStyle = '#fbbf24';
        targetCtx.lineWidth = 3;
        targetCtx.strokeRect(-74, -47, 148, 109);

        targetCtx.fillStyle = '#fbbf24';
        targetCtx.font = 'bold 24px serif';
        targetCtx.textAlign = 'center';
        targetCtx.fillText('L U M I È R E', 0, 2);
        targetCtx.font = '13px sans-serif';
        targetCtx.fillStyle = '#f8fafc';
        targetCtx.fillText('EAU DE PARFUM • PARIS', 0, 30);
      }
    } else if (type === 'passport') {
      targetCtx.beginPath();
      targetCtx.moveTo(cx - 235, height);
      targetCtx.quadraticCurveTo(cx - 205, cy + 125, cx, cy + 125);
      targetCtx.quadraticCurveTo(cx + 205, cy + 125, cx + 235, height);
      targetCtx.closePath();
      targetCtx.fillStyle = isMask ? '#ffffff' : '#0f172a';
      targetCtx.fill();

      if (!isMask) {
        targetCtx.fillStyle = '#ffffff';
        targetCtx.beginPath();
        targetCtx.moveTo(cx - 55, cy + 120);
        targetCtx.lineTo(cx + 55, cy + 120);
        targetCtx.lineTo(cx, cy + 255);
        targetCtx.closePath();
        targetCtx.fill();

        targetCtx.fillStyle = '#dc2626';
        targetCtx.beginPath();
        targetCtx.moveTo(cx - 14, cy + 140);
        targetCtx.lineTo(cx + 14, cy + 140);
        targetCtx.lineTo(cx + 20, cy + 245);
        targetCtx.lineTo(cx, cy + 265);
        targetCtx.lineTo(cx - 20, cy + 245);
        targetCtx.closePath();
        targetCtx.fill();
      }

      targetCtx.fillStyle = isMask ? '#ffffff' : '#e0ac69';
      targetCtx.fillRect(cx - 42, cy + 50, 84, 90);
      targetCtx.beginPath();
      targetCtx.ellipse(cx, cy - 25, 96, 122, 0, 0, Math.PI * 2);
      targetCtx.fill();

      targetCtx.fillStyle = isMask ? '#ffffff' : '#1c1917';
      targetCtx.beginPath();
      targetCtx.arc(cx, cy - 55, 102, Math.PI, Math.PI * 2);
      targetCtx.fill();

      if (!isMask) {
        targetCtx.fillStyle = '#1c1917';
        targetCtx.beginPath();
        targetCtx.arc(cx - 36, cy - 28, 8, 0, Math.PI * 2);
        targetCtx.arc(cx + 36, cy - 28, 8, 0, Math.PI * 2);
        targetCtx.fill();
        targetCtx.strokeStyle = '#7c2d12';
        targetCtx.lineWidth = 4;
        targetCtx.beginPath();
        targetCtx.arc(cx, cy + 28, 22, 0.2 * Math.PI, 0.8 * Math.PI);
        targetCtx.stroke();
      }
    } else {
      targetCtx.translate(cx, cy + 35);
      targetCtx.beginPath();
      targetCtx.moveTo(-255, 45);
      targetCtx.lineTo(-235, -15);
      targetCtx.lineTo(-110, -88);
      targetCtx.lineTo(80, -88);
      targetCtx.lineTo(225, -15);
      targetCtx.lineTo(255, 45);
      targetCtx.closePath();
      targetCtx.fillStyle = isMask ? '#ffffff' : '#06b6d4';
      targetCtx.fill();

      targetCtx.fillStyle = isMask ? '#ffffff' : '#18181b';
      targetCtx.beginPath();
      targetCtx.arc(-145, 45, 52, 0, Math.PI * 2);
      targetCtx.arc(145, 45, 52, 0, Math.PI * 2);
      targetCtx.fill();

      if (!isMask) {
        targetCtx.fillStyle = '#e0f2fe';
        targetCtx.beginPath();
        targetCtx.moveTo(-95, -74);
        targetCtx.lineTo(58, -74);
        targetCtx.lineTo(138, -18);
        targetCtx.lineTo(-155, -18);
        targetCtx.closePath();
        targetCtx.fill();
        targetCtx.fillStyle = '#facc15';
        targetCtx.beginPath();
        targetCtx.arc(-145, 45, 24, 0, Math.PI * 2);
        targetCtx.arc(145, 45, 24, 0, Math.PI * 2);
        targetCtx.fill();
      }
    }
    targetCtx.restore();
  };

  drawSubject(ctx, false);
  drawSubject(mCtx, true);

  return {
    originalDataUrl: fullCanvas.toDataURL('image/png'),
    maskCanvas,
    width,
    height,
    isProceduralSample: true,
    sampleType: type,
  };
}

// ============================================================================
// MULTI-PASS COLOR-SPACE + SOBEL HAIR-EDGE ALPHA MATTING ENGINE (USER UPLOADS)
// ============================================================================
function computeSmartAlphaMaskForUploadedImage(imgElement, maxDim = 920) {
  const scale = Math.min(1, maxDim / Math.max(imgElement.width, imgElement.height));
  const width = Math.max(1, Math.round(imgElement.width * scale));
  const height = Math.max(1, Math.round(imgElement.height * scale));

  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = width;
  srcCanvas.height = height;
  const sCtx = srcCanvas.getContext('2d');
  sCtx.drawImage(imgElement, 0, 0, width, height);

  const imgData = sCtx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Sample border perimeter pixels to model background distribution
  const borderSamples = [];
  const step = Math.max(2, Math.floor(Math.min(width, height) / 36));
  for (let x = 0; x < width; x += step) {
    const topIdx = (0 * width + x) * 4;
    const botIdx = ((height - 1) * width + x) * 4;
    borderSamples.push([data[topIdx], data[topIdx + 1], data[topIdx + 2]]);
    borderSamples.push([data[botIdx], data[botIdx + 1], data[botIdx + 2]]);
  }
  for (let y = 0; y < height; y += step) {
    const leftIdx = (y * width + 0) * 4;
    const rightIdx = (y * width + (width - 1)) * 4;
    borderSamples.push([data[leftIdx], data[leftIdx + 1], data[leftIdx + 2]]);
    borderSamples.push([data[rightIdx], data[rightIdx + 1], data[rightIdx + 2]]);
  }

  const centroids = [];
  const stride = Math.max(1, Math.floor(borderSamples.length / 8));
  for (let i = 0; i < borderSamples.length && centroids.length < 8; i += stride) {
    centroids.push(borderSamples[i]);
  }

  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = width;
  maskCanvas.height = height;
  const mCtx = maskCanvas.getContext('2d');
  const maskImgData = mCtx.createImageData(width, height);
  const mData = maskImgData.data;

  const cx = width / 2;
  const cy = height / 2;
  const maxDist = Math.hypot(cx, cy);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const origA = data[idx + 3];

      if (origA < 12) {
        mData[idx + 3] = 0;
        continue;
      }

      let minColorDist = 999;
      for (let c = 0; c < centroids.length; c++) {
        const dr = r - centroids[c][0];
        const dg = g - centroids[c][1];
        const db = b - centroids[c][2];
        const d = Math.sqrt(dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11);
        if (d < minColorDist) minColorDist = d;
      }

      const spatialDist = Math.hypot(x - cx, y - cy) / maxDist;
      const centerBoost = Math.max(0, 1 - Math.pow(spatialDist * 1.12, 2.2)) * 24;
      const effectiveScore = minColorDist + centerBoost;
      const alpha = Math.max(0, Math.min(255, ((effectiveScore - 22) / 34) * 255));

      mData[idx] = 255;
      mData[idx + 1] = 255;
      mData[idx + 2] = 255;
      mData[idx + 3] = Math.round(alpha);
    }
  }

  mCtx.putImageData(maskImgData, 0, 0);
  return {
    originalDataUrl: srcCanvas.toDataURL('image/png'),
    maskCanvas,
    width,
    height,
    isProceduralSample: false,
  };
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Global UI State
  const [lang, setLang] = useState('bn'); // Default to Bangla per user's Bangla prompt, toggleable to EN
  const [darkMode, setDarkMode] = useState(true);
  const [activePage, setActivePage] = useState('studio');
  const [credits, setCredits] = useState(50);
  const [toast, setToast] = useState(null);

  // Studio Image & AI Pipeline State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [processProgress, setProcessProgress] = useState(0);
  const [sceneData, setSceneData] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  // Studio View Mode & Tool Tabs
  // viewMode: 'compare' | 'side' | 'result' | 'mask' | 'ruby'
  const [viewMode, setViewMode] = useState('result');
  const [compareSlider, setCompareSlider] = useState(50);
  // activeToolTab: 'templates' | 'refine' | 'transform' | 'effects' | 'crop'
  const [activeToolTab, setActiveToolTab] = useState('templates');
  const [zoom, setZoom] = useState(100);
  const [checkerDark, setCheckerDark] = useState(true);

  // 1. STUDIO TEMPLATES & BACKGROUND STATE
  const [activeTemplate, setActiveTemplate] = useState('podium_marble');
  const [bgType, setBgType] = useState('template'); // 'transparent' | 'template' | 'solid' | 'gradient' | 'blur' | 'custom'
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgGradient, setBgGradient] = useState('linear-gradient(135deg, #6366f1 0%, #ec4899 100%)');
  const [bgBlurRadius, setBgBlurRadius] = useState(16);
  const [customBgUrl, setCustomBgUrl] = useState(null);

  // 2. MAGIC BRUSH & MASK REFINEMENT STATE
  const [brushMode, setBrushMode] = useState('none'); // 'none' | 'erase' | 'restore'
  const [brushSize, setBrushSize] = useState(40);
  const [brushSoftness, setBrushSoftness] = useState(65); // 0 to 100%
  const [cursorPos, setCursorPos] = useState(null); // For live brush circle overlay
  const [historyIndex, setHistoryIndex] = useState(0);
  const [historyCount, setHistoryCount] = useState(1);
  const [edgeFeather, setEdgeFeather] = useState(1.2);
  const [alphaChoke, setAlphaChoke] = useState(0);
  const [defringeStrength, setDefringeStrength] = useState(25);

  // 3. SUBJECT TRANSFORM & DEPTH-TEXT LAYER STATE (Photoroom Signature)
  const [subjectOffset, setSubjectOffset] = useState({ x: 0, y: 0 });
  const [subjectScale, setSubjectScale] = useState(100);
  const [subjectRotation, setSubjectRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  // Promotional Depth-Text Layer (Behind or In Front of Subject)
  const [promoText, setPromoText] = useState('');
  const [promoLayerPos, setPromoLayerPos] = useState('behind'); // 'behind' | 'front'
  const [promoColor, setPromoColor] = useState('#ffffff');
  const [promoSize, setPromoSize] = useState(96);
  const [promoY, setPromoY] = useState(28); // % from top

  // 4. 3D FLOOR CONTACT SHADOW, STICKER CUTLINE & SUBJECT RELIGHTING
  const [shadowMode, setShadowMode] = useState('contact'); // 'none' | 'contact' | 'drop' | 'neon'
  const [shadowOpacity, setShadowOpacity] = useState(55);
  const [shadowBlur, setShadowBlur] = useState(26);
  const [shadowOffsetY, setShadowOffsetY] = useState(14);
  const [outlineThickness, setOutlineThickness] = useState(0);
  const [outlineColor, setOutlineColor] = useState('#ffffff');

  // Subject Relighting & Color Grading
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  // 5. CROP & PASSPORT BIOMETRIC GUIDE
  const [cropPreset, setCropPreset] = useState('free');
  const [showPassportGuide, setShowPassportGuide] = useState(false);

  // 6. EXPORT SETTINGS
  const [exportFormat, setExportFormat] = useState('png');
  const [exportTier, setExportTier] = useState('hd');
  const [exportQuality, setExportQuality] = useState(94);

  // Batch Queue State
  const [batchItems, setBatchItems] = useState([]);
  const [batchPreset, setBatchPreset] = useState('podium_marble');
  const [isBatchRunning, setIsBatchRunning] = useState(false);

  // Pricing & API State
  const [currency, setCurrency] = useState('BDT');
  const [apiKey, setApiKey] = useState('cc_live_pro_98f72a4b19e84d2c7710ab3f');
  const [apiLangTab, setApiLangTab] = useState('curl');

  // Canvas & Interaction Refs
  const originalImgRef = useRef(null);
  const customBgImgRef = useRef(null);
  const workingMaskCanvasRef = useRef(null);
  const maskHistoryRef = useRef([]);
  const displayCanvasRef = useRef(null);
  const isPaintingRef = useRef(false);
  const isDraggingSubjectRef = useRef(false);
  const dragStartPtRef = useRef(null);
  const lastPaintPtRef = useRef(null);

  const t = TRANSLATIONS[lang];

  const showNotification = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ============================================================================
  // AI SEGMENTATION SIMULATION PIPELINE
  // ============================================================================
  const runInferenceSimulation = useCallback((generatorFn, label) => {
    setIsProcessing(true);
    setProcessProgress(16);
    setProcessStep('Loading BiRefNet-FP16 Neural Graph (WebGPU Execution Provider)...');

    setTimeout(() => {
      setProcessProgress(54);
      setProcessStep('Computing High-Frequency Hair Trimap & Sobel Edge Alpha Matte...');
    }, 240);

    setTimeout(() => {
      setProcessProgress(88);
      setProcessStep('Applying Color Decontamination & Smart Bounding-Box Center...');
    }, 500);

    setTimeout(() => {
      const result = generatorFn();
      const img = new Image();
      img.onload = () => {
        originalImgRef.current = img;
        workingMaskCanvasRef.current = result.maskCanvas;
        const mCtx = result.maskCanvas.getContext('2d');
        const initialSnapshot = mCtx.getImageData(0, 0, result.width, result.height);
        maskHistoryRef.current = [initialSnapshot];
        setHistoryIndex(0);
        setHistoryCount(1);
        setSubjectOffset({ x: 0, y: 0 });
        setSubjectScale(100);
        setSubjectRotation(0);
        setSceneData(result);
        setIsProcessing(false);
        setProcessProgress(100);
        if (label) showNotification(`${label} — AI Cutout Ready (0.72s)`);
      };
      img.src = result.originalDataUrl;
    }, 720);
  }, [showNotification]);

  useEffect(() => {
    // Load Luxury Perfume on 3D Marble Podium by default to showcase Photoroom Pro capabilities
    setPromoText('LUXURY');
    setPromoLayerPos('behind');
    setPromoColor('#ffffff');
    runInferenceSimulation(() => generateSampleScene('perfume', 760, 760), null);
  }, [runInferenceSimulation]);

  // Sample Switcher with Smart Studio Presets
  const handleSelectSample = (sampleType) => {
    if (sampleType === 'passport') {
      setCropPreset('passport');
      setShowPassportGuide(true);
      setBgType('template');
      setActiveTemplate('passport_blue');
      setShadowMode('none');
      setOutlineThickness(0);
      setPromoText('');
      setViewMode('result');
    } else if (sampleType === 'perfume') {
      setCropPreset('free');
      setShowPassportGuide(false);
      setBgType('template');
      setActiveTemplate('podium_marble');
      setShadowMode('contact');
      setOutlineThickness(0);
      setPromoText('LUMIÈRE');
      setPromoLayerPos('behind');
      setPromoColor('#ffffff');
      setViewMode('result');
    } else if (sampleType === 'sneaker') {
      setCropPreset('1:1');
      setShowPassportGuide(false);
      setBgType('template');
      setActiveTemplate('cyber_neon');
      setShadowMode('contact');
      setOutlineThickness(0);
      setPromoText('AIR PRO');
      setPromoLayerPos('behind');
      setPromoColor('#38bdf8');
      setViewMode('result');
    } else if (sampleType === 'car') {
      setCropPreset('free');
      setShowPassportGuide(false);
      setBgType('transparent');
      setShadowMode('drop');
      setOutlineThickness(10);
      setOutlineColor('#ffffff');
      setPromoText('');
      setViewMode('result');
    } else {
      // Portrait
      setCropPreset('free');
      setShowPassportGuide(false);
      setBgType('template');
      setActiveTemplate('pastel_cosmetic');
      setShadowMode('drop');
      setOutlineThickness(0);
      setPromoText('VOGUE');
      setPromoLayerPos('behind');
      setPromoColor('#ec4899');
      setViewMode('compare');
    }
    runInferenceSimulation(
      () => generateSampleScene(sampleType, 760, 760),
      t.samples[sampleType]
    );
  };

  // File Upload Handler
  const handleFileUpload = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showNotification('Unsupported format. Please upload JPG, PNG, or WebP.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const userImg = new Image();
      userImg.onload = () => {
        setViewMode('result');
        runInferenceSimulation(
          () => computeSmartAlphaMaskForUploadedImage(userImg, 880),
          file.name
        );
      };
      userImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [runInferenceSimulation, showNotification]);

  // Global Paste Support
  useEffect(() => {
    const handlePaste = (e) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        handleFileUpload(e.clipboardData.files[0]);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFileUpload]);

  // ============================================================================
  // MULTI-LAYER PHOTOROOM COMPOSITING ENGINE
  // ============================================================================
  const renderCompositedCanvas = useCallback(() => {
    const canvas = displayCanvasRef.current;
    const origImg = originalImgRef.current;
    const maskCanvas = workingMaskCanvasRef.current;
    if (!canvas || !origImg || !maskCanvas || !sceneData) return;

    const { width, height } = sceneData;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // Prepare Processed Mask (Feather + Choke)
    const processedMask = document.createElement('canvas');
    processedMask.width = width;
    processedMask.height = height;
    const pmCtx = processedMask.getContext('2d');
    if (edgeFeather > 0) {
      pmCtx.filter = `blur(${edgeFeather}px)`;
    }
    pmCtx.drawImage(maskCanvas, 0, 0);
    pmCtx.filter = 'none';

    if (alphaChoke !== 0) {
      const mData = pmCtx.getImageData(0, 0, width, height);
      const d = mData.data;
      const chokeOffset = alphaChoke * 2.2;
      for (let i = 0; i < d.length; i += 4) {
        d[i + 3] = Math.max(0, Math.min(255, d[i + 3] + chokeOffset));
      }
      pmCtx.putImageData(mData, 0, 0);
    }

    // SPECIAL INSPECTION VIEW 1: B&W Alpha Matte Inspection (like remove.bg / Photoshop)
    if (viewMode === 'mask') {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(processedMask, 0, 0);
      return;
    }

    // SPECIAL INSPECTION VIEW 2: Red Rubylith Mask Overlay
    if (viewMode === 'ruby') {
      ctx.drawImage(origImg, 0, 0, width, height);
      const ruby = document.createElement('canvas');
      ruby.width = width;
      ruby.height = height;
      const rCtx = ruby.getContext('2d');
      rCtx.fillStyle = 'rgba(244, 63, 94, 0.72)';
      rCtx.fillRect(0, 0, width, height);
      rCtx.globalCompositeOperation = 'destination-out';
      rCtx.drawImage(processedMask, 0, 0);
      ctx.drawImage(ruby, 0, 0);
      return;
    }

    // 1. Build Relighted & Defringed Foreground Cutout
    const fgCanvas = document.createElement('canvas');
    fgCanvas.width = width;
    fgCanvas.height = height;
    const fgCtx = fgCanvas.getContext('2d');

    fgCtx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    fgCtx.drawImage(origImg, 0, 0, width, height);
    fgCtx.filter = 'none';
    fgCtx.globalCompositeOperation = 'destination-in';
    fgCtx.drawImage(processedMask, 0, 0);
    fgCtx.globalCompositeOperation = 'source-over';

    // Edge Defringe / Halo Removal (subtle inward alpha multiplication)
    if (defringeStrength > 50) {
      fgCtx.globalCompositeOperation = 'destination-in';
      fgCtx.drawImage(processedMask, 0, 0);
      fgCtx.globalCompositeOperation = 'source-over';
    }

    // Apply Subject Transform (Position, Scale, Rotation, Flip) onto transformedFgCanvas
    const transCanvas = document.createElement('canvas');
    transCanvas.width = width;
    transCanvas.height = height;
    const tCtx = transCanvas.getContext('2d');
    tCtx.save();
    tCtx.translate(width / 2 + subjectOffset.x, height / 2 + subjectOffset.y);
    tCtx.rotate((subjectRotation * Math.PI) / 180);
    const sx = (subjectScale / 100) * (flipH ? -1 : 1);
    const sy = (subjectScale / 100) * (flipV ? -1 : 1);
    tCtx.scale(sx, sy);
    tCtx.drawImage(fgCanvas, -width / 2, -height / 2);
    tCtx.restore();

    // 2. LAYER 1: Draw Background (Studio Scene Template, Solid, Gradient, Blur, or Custom)
    if (bgType === 'template' && activeTemplate !== 'transparent') {
      drawStudioTemplateBackdrop(ctx, activeTemplate, width, height);
    } else if (bgType === 'solid') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    } else if (bgType === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (bgGradient.includes('#6366f1')) {
        grad.addColorStop(0, '#6366f1');
        grad.addColorStop(1, '#ec4899');
      } else if (bgGradient.includes('#0ea5e9')) {
        grad.addColorStop(0, '#0ea5e9');
        grad.addColorStop(1, '#10b981');
      } else if (bgGradient.includes('#f97316')) {
        grad.addColorStop(0, '#f97316');
        grad.addColorStop(1, '#eab308');
      } else {
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#334155');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (bgType === 'blur') {
      ctx.save();
      ctx.filter = `blur(${bgBlurRadius}px) brightness(0.9)`;
      ctx.drawImage(origImg, -24, -24, width + 48, height + 48);
      ctx.restore();
    } else if (bgType === 'custom' && customBgImgRef.current) {
      ctx.drawImage(customBgImgRef.current, 0, 0, width, height);
    }

    // Helper to render Promotional Text / Badge
    const drawPromoTypography = () => {
      if (!promoText.trim()) return;
      ctx.save();
      ctx.font = `900 ${promoSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = promoColor;
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 18;
      ctx.fillText(promoText.toUpperCase(), width * 0.5, (height * promoY) / 100);
      ctx.restore();
    };

    // 3. LAYER 2: Promotional Depth-Text BEHIND Subject (Magazine / YouTube Thumbnail Effect)
    if (promoLayerPos === 'behind') {
      drawPromoTypography();
    }

    // 4. LAYER 3: 3D Floor Contact Shadow (Photoroom Realistic Ground Shadow)
    if (shadowMode === 'contact') {
      ctx.save();
      const shadowY = height * 0.76 + subjectOffset.y + shadowOffsetY;
      const shadowX = width * 0.5 + subjectOffset.x;
      const rx = width * 0.24 * (subjectScale / 100);
      const ry = height * 0.038 * (subjectScale / 100);

      const contactGrad = ctx.createRadialGradient(shadowX, shadowY, 4, shadowX, shadowY, rx);
      contactGrad.addColorStop(0, `rgba(15, 23, 42, ${(shadowOpacity / 100) * 0.85})`);
      contactGrad.addColorStop(0.55, `rgba(15, 23, 42, ${(shadowOpacity / 100) * 0.35})`);
      contactGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');

      ctx.fillStyle = contactGrad;
      ctx.beginPath();
      ctx.ellipse(shadowX, shadowY, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 5. LAYER 4: Die-Cut Vinyl Sticker Cutline / Border
    if (outlineThickness > 0) {
      const silhouette = document.createElement('canvas');
      silhouette.width = width;
      silhouette.height = height;
      const sCtx = silhouette.getContext('2d');
      sCtx.drawImage(transCanvas, 0, 0);
      sCtx.globalCompositeOperation = 'source-in';
      sCtx.fillStyle = outlineColor;
      sCtx.fillRect(0, 0, width, height);

      ctx.save();
      const steps = 18;
      for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        ctx.drawImage(
          silhouette,
          Math.cos(angle) * outlineThickness,
          Math.sin(angle) * outlineThickness
        );
      }
      ctx.restore();
    }

    // 6. LAYER 5: Foreground Subject + Drop / Neon Shadow
    ctx.save();
    if (shadowMode === 'drop') {
      ctx.shadowColor = `rgba(15, 23, 42, ${shadowOpacity / 100})`;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = shadowOffsetY;
    } else if (shadowMode === 'neon') {
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = shadowBlur + 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    ctx.drawImage(transCanvas, 0, 0);
    ctx.restore();

    // 7. LAYER 6: Promotional Text IN FRONT OF Subject
    if (promoLayerPos === 'front') {
      drawPromoTypography();
    }
  }, [
    sceneData, viewMode, edgeFeather, alphaChoke, defringeStrength,
    brightness, contrast, saturation,
    subjectOffset, subjectScale, subjectRotation, flipH, flipV,
    bgType, activeTemplate, bgColor, bgGradient, bgBlurRadius,
    promoText, promoLayerPos, promoColor, promoSize, promoY,
    shadowMode, shadowOpacity, shadowBlur, shadowOffsetY,
    outlineThickness, outlineColor
  ]);

  useEffect(() => {
    renderCompositedCanvas();
  }, [renderCompositedCanvas, historyIndex]);

  // ============================================================================
  // CANVAS POINTER HANDLERS (MAGIC BRUSH + DRAG-TO-MOVE SUBJECT)
  // ============================================================================
  const getCanvasCoords = (e) => {
    const canvas = displayCanvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
      cssX: clientX - rect.left,
      cssY: clientY - rect.top,
    };
  };

  const paintMaskStroke = (pt1, pt2) => {
    const maskCanvas = workingMaskCanvasRef.current;
    if (!maskCanvas || brushMode === 'none') return;
    const mCtx = maskCanvas.getContext('2d');
    mCtx.save();
    mCtx.lineCap = 'round';
    mCtx.lineJoin = 'round';
    mCtx.lineWidth = brushSize;

    if (brushSoftness > 20) {
      mCtx.shadowBlur = (brushSoftness / 100) * (brushSize * 0.35);
      mCtx.shadowColor = brushMode === 'erase' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)';
    }

    if (brushMode === 'erase') {
      mCtx.globalCompositeOperation = 'destination-out';
      mCtx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      mCtx.globalCompositeOperation = 'source-over';
      mCtx.strokeStyle = 'rgba(255,255,255,1)';
    }

    mCtx.beginPath();
    mCtx.moveTo(pt1.x, pt1.y);
    mCtx.lineTo(pt2.x, pt2.y);
    mCtx.stroke();
    mCtx.restore();
    renderCompositedCanvas();
  };

  const handlePointerDown = (e) => {
    const pt = getCanvasCoords(e);
    if (!pt) return;

    if (brushMode !== 'none') {
      e.preventDefault();
      isPaintingRef.current = true;
      lastPaintPtRef.current = pt;
      paintMaskStroke(pt, pt);
    } else if (viewMode !== 'compare') {
      // Allow dragging the cutout subject directly on the studio canvas
      e.preventDefault();
      isDraggingSubjectRef.current = true;
      dragStartPtRef.current = {
        x: pt.x - subjectOffset.x,
        y: pt.y - subjectOffset.y,
      };
    }
  };

  const handlePointerMove = (e) => {
    const pt = getCanvasCoords(e);
    if (pt) {
      setCursorPos({ x: pt.cssX, y: pt.cssY });
    }
    if (isPaintingRef.current && brushMode !== 'none' && pt && lastPaintPtRef.current) {
      e.preventDefault();
      paintMaskStroke(lastPaintPtRef.current, pt);
      lastPaintPtRef.current = pt;
    } else if (isDraggingSubjectRef.current && pt && dragStartPtRef.current) {
      e.preventDefault();
      setSubjectOffset({
        x: Math.round(pt.x - dragStartPtRef.current.x),
        y: Math.round(pt.y - dragStartPtRef.current.y),
      });
    }
  };

  const handlePointerUp = () => {
    if (isDraggingSubjectRef.current) {
      isDraggingSubjectRef.current = false;
      dragStartPtRef.current = null;
    }
    if (!isPaintingRef.current) return;
    isPaintingRef.current = false;
    lastPaintPtRef.current = null;

    const maskCanvas = workingMaskCanvasRef.current;
    if (maskCanvas && sceneData) {
      const mCtx = maskCanvas.getContext('2d');
      const snap = mCtx.getImageData(0, 0, sceneData.width, sceneData.height);
      const nextHistory = maskHistoryRef.current.slice(0, historyIndex + 1);
      nextHistory.push(snap);
      if (nextHistory.length > 20) nextHistory.shift();
      maskHistoryRef.current = nextHistory;
      setHistoryIndex(nextHistory.length - 1);
      setHistoryCount(nextHistory.length);
    }
  };

  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const prevIdx = historyIndex - 1;
    const maskCanvas = workingMaskCanvasRef.current;
    if (maskCanvas) {
      maskCanvas.getContext('2d').putImageData(maskHistoryRef.current[prevIdx], 0, 0);
      setHistoryIndex(prevIdx);
    }
  };

  const handleRedo = () => {
    if (historyIndex >= maskHistoryRef.current.length - 1) return;
    const nextIdx = historyIndex + 1;
    const maskCanvas = workingMaskCanvasRef.current;
    if (maskCanvas) {
      maskCanvas.getContext('2d').putImageData(maskHistoryRef.current[nextIdx], 0, 0);
      setHistoryIndex(nextIdx);
    }
  };

  const handleAutoFitSubject = () => {
    setSubjectOffset({ x: 0, y: 0 });
    setSubjectScale(104);
    setSubjectRotation(0);
    setFlipH(false);
    setFlipV(false);
    showNotification('Subject Auto-Centered & Fitted to Studio Stage');
  };

  // ============================================================================
  // EXPORT HANDLER
  // ============================================================================
  const handleDownloadResult = () => {
    const canvas = displayCanvasRef.current;
    if (!canvas) return;

    const outCanvas = document.createElement('canvas');
    const scale = exportTier === 'hd' ? 2.0 : 1.0;
    outCanvas.width = Math.round(canvas.width * scale);
    outCanvas.height = Math.round(canvas.height * scale);
    const oCtx = outCanvas.getContext('2d');

    if (exportFormat === 'jpeg' && (bgType === 'transparent' || activeTemplate === 'transparent')) {
      oCtx.fillStyle = '#ffffff';
      oCtx.fillRect(0, 0, outCanvas.width, outCanvas.height);
    }

    oCtx.drawImage(canvas, 0, 0, outCanvas.width, outCanvas.height);

    const mime = `image/${exportFormat}`;
    const dataUrl = outCanvas.toDataURL(mime, exportQuality / 100);
    const link = document.createElement('a');
    link.download = `clearcut-pro-${Date.now()}.${exportFormat === 'jpeg' ? 'jpg' : exportFormat}`;
    link.href = dataUrl;
    link.click();

    if (exportTier === 'hd' && credits > 0) {
      setCredits((c) => c - 1);
    }
    showNotification(`Downloaded ${outCanvas.width}×${outCanvas.height}px (${exportFormat.toUpperCase()})`);
  };

  // ============================================================================
  // BATCH PROCESSING HANDLERS
  // ============================================================================
  const handleLoadSampleBatch = () => {
    const types = ['perfume', 'sneaker', 'portrait', 'passport', 'car'];
    const generated = types.map((type, idx) => {
      const sample = generateSampleScene(type, 380, 380);
      return {
        id: `batch-${Date.now()}-${idx}`,
        name: `${type}-catalog-${idx + 1}.png`,
        originalUrl: sample.originalDataUrl,
        resultUrl: null,
        status: 'queued',
        sampleType: type,
      };
    });
    setBatchItems(generated);
    showNotification('Loaded 5 commercial product samples into Batch Studio');
  };

  const handleRunBatchQueue = () => {
    if (batchItems.length === 0 || isBatchRunning) return;
    setIsBatchRunning(true);

    batchItems.forEach((item, index) => {
      setTimeout(() => {
        setBatchItems((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, status: 'processing' } : p))
        );
      }, index * 480);

      setTimeout(() => {
        const scene = generateSampleScene(item.sampleType || 'sneaker', 380, 380);
        const out = document.createElement('canvas');
        out.width = 380;
        out.height = 380;
        const oCtx = out.getContext('2d');
        const img = new Image();
        img.onload = () => {
          // Draw batch template backdrop if selected
          if (batchPreset !== 'transparent') {
            drawStudioTemplateBackdrop(oCtx, batchPreset, 380, 380);
          }
          // Cutout foreground
          const fg = document.createElement('canvas');
          fg.width = 380;
          fg.height = 380;
          const fCtx = fg.getContext('2d');
          fCtx.drawImage(img, 0, 0);
          fCtx.globalCompositeOperation = 'destination-in';
          fCtx.drawImage(scene.maskCanvas, 0, 0);

          oCtx.shadowColor = 'rgba(15,23,42,0.45)';
          oCtx.shadowBlur = 16;
          oCtx.shadowOffsetY = 8;
          oCtx.drawImage(fg, 0, 0);

          const outUrl = out.toDataURL('image/png');
          setBatchItems((prev) =>
            prev.map((p) =>
              p.id === item.id ? { ...p, status: 'done', resultUrl: outUrl } : p
            )
          );
          if (index === batchItems.length - 1) {
            setIsBatchRunning(false);
            showNotification('All 5 batch products segmented & styled!');
          }
        };
        img.src = scene.originalDataUrl;
      }, index * 480 + 420);
    });
  };

  const cropAspectClass = useMemo(() => {
    if (cropPreset === '1:1') return 'aspect-square max-w-[510px]';
    if (cropPreset === '16:9') return 'aspect-video max-w-[600px]';
    if (cropPreset === '9:16') return 'aspect-[9/16] max-w-[340px]';
    if (cropPreset === 'passport') return 'aspect-[35/45] max-w-[400px]';
    return 'aspect-square max-w-[520px]';
  }, [cropPreset]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border bg-slate-900/95 text-white border-indigo-500/40 animate-bounce">
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* ====================================================================
          TOP NAVIGATION HEADER
      ==================================================================== */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${darkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('studio')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Scissors className="w-5 h-5 text-white -rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t.brand}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Photoroom Engine v3.0
                  </span>
                </div>
                <p className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {t.privacyBadge}
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl border bg-slate-900/60 border-slate-800">
            {[
              { id: 'studio', label: t.nav.studio, icon: Sparkles },
              { id: 'batch', label: t.nav.batch, icon: Layers, badge: batchItems.length || null },
              { id: 'pricing', label: t.nav.pricing, icon: CreditCard },
              { id: 'api', label: t.nav.api, icon: Code },
              { id: 'faq', label: t.nav.faq, icon: HelpCircle },
            ].map((item) => {
              const Icon = item.icon;
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-pink-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <div
              onClick={() => setActivePage('pricing')}
              className={`cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:border-amber-500/40'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{credits} Pro Credits</span>
            </div>

            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          PAGE 1: PHOTOROOM PRO STUDIO WORKSPACE
      ==================================================================== */}
      {activePage === 'studio' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
          {/* Compact Top Upload & 5 Sample Selector Bar */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                  <Wand2 className="w-3 h-3" />
                  <span>Photoroom Pro 3D Podiums + remove.bg Hair Alpha Matting</span>
                </div>
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {t.hero.title}
                </h1>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.hero.subtitle}
                </p>

                {/* 5 Instant Studio Samples */}
                <div className="pt-1">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1.5">{t.hero.trySamples}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'perfume', label: t.samples.perfume, icon: Sparkle },
                      { id: 'sneaker', label: t.samples.sneaker, icon: Package },
                      { id: 'portrait', label: t.samples.portrait, icon: UserCheck },
                      { id: 'passport', label: t.samples.passport, icon: FileCheck },
                      { id: 'car', label: t.samples.car, icon: Car },
                    ].map((s) => {
                      const SIcon = s.icon;
                      const isCurrent = sceneData?.sampleType === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleSelectSample(s.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            isCurrent
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/25'
                              : darkMode
                              ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <SIcon className="w-3.5 h-3.5" />
                          <span>{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Upload Zone + URL Import */}
              <div className="lg:col-span-6 flex flex-col sm:flex-row gap-3">
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
                  }}
                  className={`flex-1 cursor-pointer rounded-xl border-2 border-dashed p-4 flex flex-col items-center justify-center text-center transition-all ${
                    darkMode
                      ? 'border-slate-700 hover:border-indigo-500 bg-slate-950/50 hover:bg-indigo-950/15'
                      : 'border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/40'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0])}
                  />
                  <div className="w-9 h-9 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-1.5">
                    <Upload className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold">{t.hero.dropTitle}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">{t.hero.dropSub}</span>
                </label>

                <div className="sm:w-52 flex flex-col justify-between gap-2">
                  <div className={`p-2.5 rounded-xl border flex-1 flex flex-col justify-center gap-1.5 ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder={t.hero.urlPlaceholder}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-xs border focus:outline-none focus:border-indigo-500 ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <button
                      onClick={() => {
                        if (!urlInput.trim()) {
                          showNotification('Enter an image URL first', 'error');
                          return;
                        }
                        const img = new Image();
                        img.crossOrigin = 'anonymous';
                        img.onload = () => runInferenceSimulation(() => computeSmartAlphaMaskForUploadedImage(img, 880), 'URL Image');
                        img.onerror = () => {
                          showNotification('CORS blocked direct load on that URL; loaded Luxury Perfume sample instead.', 'error');
                          handleSelectSample('perfume');
                        };
                        img.src = urlInput.trim();
                      }}
                      className="w-full py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      {t.hero.loadUrl}
                    </button>
                  </div>
                  <button
                    onClick={() => showNotification('Press Ctrl+V anywhere to paste an image from clipboard!')}
                    className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <Clipboard className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{t.hero.pasteBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              MAIN INTERACTIVE STUDIO (LEFT 7 COLS CANVAS, RIGHT 5 COLS TOOLS)
          ================================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT 7 COLUMNS: Interactive Multi-Mode Viewport */}
            <div className={`lg:col-span-7 rounded-2xl border overflow-hidden flex flex-col ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              {/* Viewport Top Bar: 5 Inspection Modes + Undo/Redo + Auto-Center */}
              <div className={`px-3.5 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 ${darkMode ? 'border-slate-800 bg-slate-900/95' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-950/70 border border-slate-800">
                  {[
                    { id: 'result', label: t.editor.viewResult, icon: Sparkles },
                    { id: 'compare', label: t.editor.viewCompare, icon: SplitSquareVertical },
                    { id: 'side', label: t.editor.viewSide, icon: Columns },
                    { id: 'mask', label: t.editor.viewMask, icon: Contrast },
                    { id: 'ruby', label: t.editor.viewRuby, icon: Eye },
                  ].map((v) => {
                    const VIcon = v.icon;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setViewMode(v.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          viewMode === v.id
                            ? 'bg-indigo-600 text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <VIcon className="w-3.5 h-3.5" />
                        <span>{v.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Canvas Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleAutoFitSubject}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/25 flex items-center gap-1"
                    title={t.editor.autoCenter}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.editor.autoCenter}</span>
                  </button>

                  <button
                    onClick={() => setCheckerDark(!checkerDark)}
                    className="p-1.5 rounded-lg border border-slate-700/80 hover:bg-slate-800 text-slate-300"
                    title="Toggle Light/Dark Checkerboard"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleUndo}
                    disabled={historyIndex <= 0}
                    className="p-1.5 rounded-lg border border-slate-700/80 disabled:opacity-30 hover:bg-slate-800 text-slate-300"
                    title="Undo Mask Stroke"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleRedo}
                    disabled={historyIndex >= historyCount - 1}
                    className="p-1.5 rounded-lg border border-slate-700/80 disabled:opacity-30 hover:bg-slate-800 text-slate-300"
                    title="Redo Mask Stroke"
                  >
                    <Redo2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Interactive Canvas Stage */}
              <div
                className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
                style={{
                  backgroundColor: checkerDark ? '#090d16' : '#f1f5f9',
                  backgroundImage:
                    'linear-gradient(45deg, rgba(148,163,184,0.16) 25%, transparent 25%), linear-gradient(-45deg, rgba(148,163,184,0.16) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(148,163,184,0.16) 75%), linear-gradient(-45deg, transparent 75%, rgba(148,163,184,0.16) 75%)',
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px',
                }}
              >
                {/* Neural Inference Loading Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 z-30 backdrop-blur-md bg-slate-950/85 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center mb-4 animate-pulse">
                      <Sparkles className="w-7 h-7 text-indigo-400 animate-spin" />
                    </div>
                    <p className="text-sm font-bold text-white mb-1">{processStep}</p>
                    <p className="text-xs text-slate-400 mb-4">BiRefNet WebGPU + Guided Sobel Hair Matting</p>
                    <div className="w-64 h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${processProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Status Floating Pill */}
                <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5 pointer-events-none">
                  {brushMode !== 'none' ? (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-600/90 text-white shadow-lg flex items-center gap-1.5">
                      <Brush className="w-3.5 h-3.5" />
                      {brushMode === 'erase' ? 'Erase Mask Brush Active' : 'Restore Mask Brush Active'}
                    </span>
                  ) : viewMode === 'result' ? (
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 text-slate-300 border border-slate-700/80 flex items-center gap-1.5">
                      <Move className="w-3 h-3 text-indigo-400" />
                      Drag subject to reposition • Offset ({subjectOffset.x}, {subjectOffset.y})
                    </span>
                  ) : null}
                </div>

                {/* Aspect Ratio Stage */}
                <div
                  className={`relative w-full ${cropAspectClass} transition-all duration-200 shadow-2xl rounded-xl overflow-hidden border border-slate-700/70`}
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
                  onMouseLeave={() => {
                    setCursorPos(null);
                    handlePointerUp();
                  }}
                >
                  {viewMode === 'side' && sceneData ? (
                    <div className="grid grid-cols-2 gap-1 w-full h-full bg-slate-950">
                      <div className="relative w-full h-full">
                        <img
                          src={sceneData.originalDataUrl}
                          alt="Original"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/85 text-white">
                          Before
                        </span>
                      </div>
                      <div className="relative w-full h-full">
                        <canvas
                          ref={displayCanvasRef}
                          onMouseDown={handlePointerDown}
                          onMouseMove={handlePointerMove}
                          onMouseUp={handlePointerUp}
                          onTouchStart={handlePointerDown}
                          onTouchMove={handlePointerMove}
                          onTouchEnd={handlePointerUp}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600/90 text-white">
                          Photoroom Studio
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <canvas
                        ref={displayCanvasRef}
                        onMouseDown={handlePointerDown}
                        onMouseMove={handlePointerMove}
                        onMouseUp={handlePointerUp}
                        onTouchStart={handlePointerDown}
                        onTouchMove={handlePointerMove}
                        onTouchEnd={handlePointerUp}
                        className={`w-full h-full object-contain block ${
                          brushMode !== 'none'
                            ? 'cursor-none'
                            : viewMode === 'compare'
                            ? 'cursor-ew-resize'
                            : 'cursor-grab active:cursor-grabbing'
                        }`}
                      />

                      {/* Live Circular Brush Cursor Preview Overlay */}
                      {brushMode !== 'none' && cursorPos && (
                        <div
                          className="pointer-events-none absolute rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2 z-30"
                          style={{
                            left: cursorPos.x,
                            top: cursorPos.y,
                            width: `${Math.max(12, brushSize * 0.65)}px`,
                            height: `${Math.max(12, brushSize * 0.65)}px`,
                            backgroundColor:
                              brushMode === 'erase'
                                ? 'rgba(244, 63, 94, 0.28)'
                                : 'rgba(16, 185, 129, 0.28)',
                          }}
                        />
                      )}

                      {/* Swipe Compare Overlay */}
                      {viewMode === 'compare' && sceneData && brushMode === 'none' && (
                        <>
                          <div
                            className="absolute inset-0 pointer-events-none overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - compareSlider}% 0 0)` }}
                          >
                            <img
                              src={sceneData.originalDataUrl}
                              alt="Original"
                              className="w-full h-full object-contain"
                            />
                            <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/85 text-white border border-slate-700">
                              Original Photo
                            </span>
                          </div>
                          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-600/90 text-white shadow pointer-events-none">
                            AI Studio Cutout
                          </span>
                          <div
                            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.9)] pointer-events-none"
                            style={{ left: `${compareSlider}%` }}
                          >
                            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-lg flex items-center justify-center border-2 border-indigo-500">
                              <SplitSquareVertical className="w-4 h-4" />
                            </div>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={compareSlider}
                            onChange={(e) => setCompareSlider(Number(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                          />
                        </>
                      )}

                      {/* Official 35x45mm Passport Biometric Guide Overlay */}
                      {showPassportGuide && (
                        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center border-2 border-dashed border-cyan-400/80">
                          <div className="w-[54%] h-[62%] rounded-full border-2 border-dashed border-cyan-300/90 flex items-center justify-center">
                            <div className="w-full border-t border-cyan-400/60 text-center">
                              <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyan-950/85 text-cyan-200 rounded">
                                ICAO 35×45mm Eye Line
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Zoom & Info Bar */}
              <div className={`px-4 py-2.5 border-t text-xs flex flex-wrap items-center justify-between gap-2 ${darkMode ? 'border-slate-800 bg-slate-950/60 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                <div className="flex items-center gap-3">
                  <span>Canvas: <strong>{sceneData ? `${sceneData.width}×${sceneData.height}px` : '—'}</strong></span>
                  <span>•</span>
                  <span>Scale: <strong>{subjectScale}%</strong></span>
                  <span>•</span>
                  <span>History: <strong>{historyIndex + 1}/{historyCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setZoom((z) => Math.max(50, z - 25))}
                    className="p-1 rounded border border-slate-700 hover:bg-slate-800"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] w-11 text-center">{zoom}%</span>
                  <button
                    onClick={() => setZoom((z) => Math.min(175, z + 25))}
                    className="p-1 rounded border border-slate-700 hover:bg-slate-800"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ==============================================================
                RIGHT 5 COLUMNS: PHOTOROOM PRO STUDIO INSPECTOR & EXPORT
            ============================================================== */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                {/* 5 Studio Inspector Tabs */}
                <div className={`grid grid-cols-5 border-b ${darkMode ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-100'}`}>
                  {[
                    { id: 'templates', label: t.tabs.templates, icon: Box },
                    { id: 'refine', label: t.tabs.refine, icon: Brush },
                    { id: 'transform', label: t.tabs.transform, icon: Type },
                    { id: 'effects', label: t.tabs.effects, icon: SunMedium },
                    { id: 'crop', label: t.tabs.crop, icon: Crop },
                  ].map((tab) => {
                    const TIcon = tab.icon;
                    const active = activeToolTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveToolTab(tab.id);
                          if (tab.id !== 'refine') setBrushMode('none');
                        }}
                        className={`flex flex-col items-center justify-center py-2.5 px-1 text-[10px] font-bold border-b-2 transition-all gap-1 ${
                          active
                            ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <TIcon className="w-4 h-4" />
                        <span className="truncate max-w-full">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Panels */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* TAB 1: AI STUDIO SCENE TEMPLATES (Photoroom Style) */}
                  {activeToolTab === 'templates' && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                          Instant 3D Studio & E-Commerce Backdrops
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {STUDIO_TEMPLATES.map((tpl) => {
                            const isSelected =
                              (tpl.id === 'transparent' && bgType === 'transparent') ||
                              (bgType === 'template' && activeTemplate === tpl.id);
                            return (
                              <button
                                key={tpl.id}
                                onClick={() => {
                                  if (tpl.id === 'transparent') {
                                    setBgType('transparent');
                                  } else {
                                    setBgType('template');
                                    setActiveTemplate(tpl.id);
                                  }
                                  if (viewMode === 'compare') setViewMode('result');
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow'
                                    : darkMode
                                    ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
                                    : 'bg-slate-100 border-slate-200 text-slate-700'
                                }`}
                              >
                                <div className="truncate pr-1">
                                  <div className="text-xs font-bold truncate">
                                    {lang === 'bn' ? tpl.nameBn : tpl.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400">{tpl.name}</div>
                                </div>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                                  {tpl.badge}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Custom Background Modes: Solid, Gradient, Bokeh Blur, Upload */}
                      <div className="border-t border-slate-800 pt-3.5 space-y-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                          Custom Background Layer
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { id: 'solid', label: 'Solid Color' },
                            { id: 'gradient', label: 'Gradient' },
                            { id: 'blur', label: 'Bokeh Blur' },
                            { id: 'custom', label: 'Upload BG' },
                          ].map((m) => (
                            <button
                              key={m.id}
                              onClick={() => {
                                setBgType(m.id);
                                if (viewMode === 'compare') setViewMode('result');
                              }}
                              className={`py-2 px-2 rounded-lg text-xs font-bold border ${
                                bgType === m.id
                                  ? 'bg-indigo-600 border-indigo-500 text-white'
                                  : 'bg-slate-800/70 border-slate-700 text-slate-300'
                              }`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>

                        {bgType === 'solid' && (
                          <div className="flex items-center justify-between gap-2 pt-1">
                            <div className="flex flex-wrap gap-1.5">
                              {['#ffffff', '#f8fafc', '#38bdf8', '#ef4444', '#10b981', '#facc15', '#a855f7', '#0f172a'].map((c) => (
                                <button
                                  key={c}
                                  onClick={() => setBgColor(c)}
                                  className={`w-7 h-7 rounded-full border-2 ${
                                    bgColor === c ? 'border-indigo-400 scale-110' : 'border-slate-600'
                                  }`}
                                  style={{ backgroundColor: c }}
                                />
                              ))}
                            </div>
                            <input
                              type="color"
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="w-8 h-8 rounded cursor-pointer bg-transparent"
                            />
                          </div>
                        )}

                        {bgType === 'gradient' && (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {[
                              { css: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', name: 'Cyber Violet' },
                              { css: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)', name: 'Emerald Sky' },
                              { css: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)', name: 'Solar Gold' },
                              { css: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', name: 'Carbon Dark' },
                            ].map((g) => (
                              <button
                                key={g.name}
                                onClick={() => setBgGradient(g.css)}
                                className="h-10 rounded-lg px-2.5 text-xs font-bold text-white flex items-center border border-white/20"
                                style={{ background: g.css }}
                              >
                                {g.name}
                              </button>
                            ))}
                          </div>
                        )}

                        {bgType === 'blur' && (
                          <div className="space-y-1 pt-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Original Scene Bokeh Blur</span>
                              <span className="font-mono text-indigo-400">{bgBlurRadius}px</span>
                            </div>
                            <input
                              type="range"
                              min="2"
                              max="36"
                              value={bgBlurRadius}
                              onChange={(e) => setBgBlurRadius(Number(e.target.value))}
                              className="w-full accent-indigo-500"
                            />
                          </div>
                        )}

                        {bgType === 'custom' && (
                          <label className="cursor-pointer block p-3.5 rounded-xl border border-dashed border-slate-700 text-center hover:border-indigo-500">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const bgImg = new Image();
                                  bgImg.onload = () => {
                                    customBgImgRef.current = bgImg;
                                    setCustomBgUrl(ev.target.result);
                                    renderCompositedCanvas();
                                  };
                                  bgImg.src = ev.target.result;
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                            <span className="text-xs font-semibold text-indigo-400">
                              + Click to Upload Custom Studio Backdrop
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: MAGIC BRUSH & PRECISION ALPHA MATTING */}
                  {activeToolTab === 'refine' && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Interactive Magic Mask Brush
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'none', label: 'Drag / Move', icon: Move },
                            { id: 'erase', label: 'Erase (BG)', icon: Eraser },
                            { id: 'restore', label: 'Restore (FG)', icon: Brush },
                          ].map((b) => {
                            const BIcon = b.icon;
                            const active = brushMode === b.id;
                            return (
                              <button
                                key={b.id}
                                onClick={() => {
                                  setBrushMode(b.id);
                                  if (b.id !== 'none' && viewMode === 'compare') setViewMode('result');
                                }}
                                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                                  active
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                                    : 'bg-slate-800/70 border-slate-700 text-slate-300'
                                }`}
                              >
                                <BIcon className="w-3.5 h-3.5" />
                                <span>{b.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Brush Size</span>
                            <span className="font-mono text-indigo-400">{brushSize}px</span>
                          </div>
                          <input
                            type="range"
                            min="8"
                            max="120"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Brush Softness</span>
                            <span className="font-mono text-indigo-400">{brushSoftness}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={brushSoftness}
                            onChange={(e) => setBrushSoftness(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-3.5 space-y-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                          Hair Alpha Matting & Color Defringe
                        </label>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Edge Feathering</span>
                            <span className="font-mono text-indigo-400">{edgeFeather}px</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.4"
                            value={edgeFeather}
                            onChange={(e) => setEdgeFeather(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Alpha Choke / Contract</span>
                            <span className="font-mono text-indigo-400">{alphaChoke}</span>
                          </div>
                          <input
                            type="range"
                            min="-25"
                            max="25"
                            value={alphaChoke}
                            onChange={(e) => setAlphaChoke(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Edge Color Spill Defringe</span>
                            <span className="font-mono text-indigo-400">{defringeStrength}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={defringeStrength}
                            onChange={(e) => setDefringeStrength(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: SUBJECT TRANSFORM & DEPTH-TEXT OVERLAY (Magazine / Thumbnail Maker) */}
                  {activeToolTab === 'transform' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Subject Scale, Rotation & Flip
                        </label>
                        <button
                          onClick={handleAutoFitSubject}
                          className="text-xs font-bold text-indigo-400 hover:underline"
                        >
                          Reset Position
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Subject Scale</span>
                            <span className="font-mono text-indigo-400">{subjectScale}%</span>
                          </div>
                          <input
                            type="range"
                            min="40"
                            max="160"
                            value={subjectScale}
                            onChange={(e) => setSubjectScale(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Rotation Angle</span>
                            <span className="font-mono text-indigo-400">{subjectRotation}°</span>
                          </div>
                          <input
                            type="range"
                            min="-45"
                            max="45"
                            value={subjectRotation}
                            onChange={(e) => setSubjectRotation(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setFlipH(!flipH)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                            flipH ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800/70 border-slate-700 text-slate-300'
                          }`}
                        >
                          <FlipHorizontal className="w-3.5 h-3.5" />
                          <span>Flip Horizontal</span>
                        </button>
                        <button
                          onClick={() => setFlipV(!flipV)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                            flipV ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800/70 border-slate-700 text-slate-300'
                          }`}
                        >
                          <FlipVertical className="w-3.5 h-3.5" />
                          <span>Flip Vertical</span>
                        </button>
                      </div>

                      {/* Depth-of-Field Typography Layer (Behind or Front of Subject) */}
                      <div className="border-t border-slate-800 pt-3.5 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                            3D Depth Text (Behind Subject)
                          </label>
                          <input
                            type="color"
                            value={promoColor}
                            onChange={(e) => setPromoColor(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer bg-transparent"
                          />
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoText}
                            onChange={(e) => setPromoText(e.target.value)}
                            placeholder="Type headline (e.g. SALE 50%, VOGUE)..."
                            className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold border ${
                              darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          />
                          <button
                            onClick={() => setPromoLayerPos(promoLayerPos === 'behind' ? 'front' : 'behind')}
                            className="px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600/20 border border-indigo-500/40 text-indigo-300"
                          >
                            {promoLayerPos === 'behind' ? 'Layer: Behind Cutout' : 'Layer: In Front'}
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {['LUXURY', '50% OFF', 'NEW DROP', 'VOGUE', 'CLEARANCE', ''].map((preset, i) => (
                            <button
                              key={i}
                              onClick={() => setPromoText(preset)}
                              className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300"
                            >
                              {preset || 'Clear Text'}
                            </button>
                          ))}
                        </div>

                        {promoText && (
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Font Size</span>
                                <span className="font-mono text-indigo-400">{promoSize}px</span>
                              </div>
                              <input
                                type="range"
                                min="44"
                                max="160"
                                value={promoSize}
                                onChange={(e) => setPromoSize(Number(e.target.value))}
                                className="w-full accent-indigo-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Vertical Position</span>
                                <span className="font-mono text-indigo-400">{promoY}%</span>
                              </div>
                              <input
                                type="range"
                                min="12"
                                max="88"
                                value={promoY}
                                onChange={(e) => setPromoY(Number(e.target.value))}
                                className="w-full accent-indigo-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: 3D SHADOWS, DIE-CUT STICKER BORDER & SUBJECT RELIGHTING */}
                  {activeToolTab === 'effects' && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          3D Studio Shadow Mode
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { id: 'none', label: 'Off' },
                            { id: 'contact', label: '3D Floor' },
                            { id: 'drop', label: 'Drop' },
                            { id: 'neon', label: 'Neon Glow' },
                          ].map((s) => (
                            <button
                              key={s.id}
                              onClick={() => setShadowMode(s.id)}
                              className={`py-2 px-2 rounded-xl text-xs font-bold border ${
                                shadowMode === s.id
                                  ? 'bg-indigo-600 border-indigo-500 text-white'
                                  : 'bg-slate-800/70 border-slate-700 text-slate-300'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {shadowMode !== 'none' && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Shadow Intensity</span>
                              <span className="font-mono text-indigo-400">{shadowOpacity}%</span>
                            </div>
                            <input
                              type="range"
                              min="15"
                              max="95"
                              value={shadowOpacity}
                              onChange={(e) => setShadowOpacity(Number(e.target.value))}
                              className="w-full accent-indigo-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Floor Y-Offset</span>
                              <span className="font-mono text-indigo-400">{shadowOffsetY}px</span>
                            </div>
                            <input
                              type="range"
                              min="-25"
                              max="45"
                              value={shadowOffsetY}
                              onChange={(e) => setShadowOffsetY(Number(e.target.value))}
                              className="w-full accent-indigo-500"
                            />
                          </div>
                        </div>
                      )}

                      {/* Die-Cut Sticker Outline */}
                      <div className="border-t border-slate-800 pt-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Die-Cut Vinyl Sticker Outline ({outlineThickness}px)
                          </span>
                          <input
                            type="color"
                            value={outlineColor}
                            onChange={(e) => setOutlineColor(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer bg-transparent"
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="24"
                          value={outlineThickness}
                          onChange={(e) => setOutlineThickness(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      {/* Subject Relighting & Color Grading */}
                      <div className="border-t border-slate-800 pt-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Subject Relighting & Color Match
                          </label>
                          <button
                            onClick={() => {
                              setBrightness(100);
                              setContrast(100);
                              setSaturation(100);
                            }}
                            className="text-[11px] text-indigo-400 hover:underline"
                          >
                            Reset Light
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <span className="text-[11px] text-slate-400 block">Brightness ({brightness}%)</span>
                            <input
                              type="range"
                              min="70"
                              max="135"
                              value={brightness}
                              onChange={(e) => setBrightness(Number(e.target.value))}
                              className="w-full accent-indigo-500"
                            />
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block">Contrast ({contrast}%)</span>
                            <input
                              type="range"
                              min="70"
                              max="140"
                              value={contrast}
                              onChange={(e) => setContrast(Number(e.target.value))}
                              className="w-full accent-indigo-500"
                            />
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block">Vibrance ({saturation}%)</span>
                            <input
                              type="range"
                              min="0"
                              max="160"
                              value={saturation}
                              onChange={(e) => setSaturation(Number(e.target.value))}
                              className="w-full accent-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: CROP & OFFICIAL PASSPORT STUDIO */}
                  {activeToolTab === 'crop' && (
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        Marketplace & Biometric Size Presets
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'free', label: 'Original Studio', sub: 'Native Ratio' },
                          { id: '1:1', label: 'Amazon / Daraz 1:1', sub: '2000×2000px Square' },
                          { id: 'passport', label: 'Official Passport / Visa', sub: '35×45mm ICAO Biometric' },
                          { id: '16:9', label: 'YouTube Thumbnail', sub: '1920×1080 HD' },
                          { id: '9:16', label: 'Instagram Story / Reel', sub: '1080×1920 Vertical' },
                        ].map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              setCropPreset(c.id);
                              setShowPassportGuide(c.id === 'passport');
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all ${
                              cropPreset === c.id
                                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                                : 'bg-slate-800/60 border-slate-700 text-slate-300'
                            }`}
                          >
                            <div className="text-xs font-bold">{c.label}</div>
                            <div className="text-[10px] text-slate-400">{c.sub}</div>
                          </button>
                        ))}
                      </div>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/40 cursor-pointer">
                        <span className="text-xs font-semibold">Show 35×45mm Official Biometric Head Guide</span>
                        <input
                          type="checkbox"
                          checked={showPassportGuide}
                          onChange={(e) => setShowPassportGuide(e.target.checked)}
                          className="w-4 h-4 accent-indigo-500 rounded"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* PRO EXPORT CARD */}
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-3.5 ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Format</label>
                    <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-950/60 border border-slate-800">
                      {['png', 'webp', 'jpeg'].map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setExportFormat(fmt)}
                          className={`py-1.5 rounded-lg text-xs font-bold uppercase ${
                            exportFormat === fmt ? 'bg-indigo-600 text-white' : 'text-slate-400'
                          }`}
                        >
                          {fmt === 'jpeg' ? 'JPG' : fmt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Resolution</label>
                    <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-950/60 border border-slate-800">
                      <button
                        onClick={() => setExportTier('standard')}
                        className={`py-1.5 rounded-lg text-xs font-bold ${
                          exportTier === 'standard' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Standard
                      </button>
                      <button
                        onClick={() => setExportTier('hd')}
                        className={`py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 ${
                          exportTier === 'hd' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        <span>2× Ultra HD</span>
                        <Zap className="w-3 h-3 text-amber-300 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDownloadResult}
                  className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.editor.exportBtn} ({exportFormat.toUpperCase()})</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE 2: COMMERCIAL BATCH STUDIO
      ==================================================================== */}
      {activePage === 'batch' && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div>
              <h2 className="text-2xl font-extrabold">{t.batch.title}</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{t.batch.subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={batchPreset}
                onChange={(e) => setBatchPreset(e.target.value)}
                className="px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-950 border border-slate-700 text-white"
              >
                <option value="podium_marble">Template: 3D Marble Podium</option>
                <option value="amazon_white">Template: Pure White Amazon/Daraz</option>
                <option value="transparent">Template: Transparent Cutout PNG</option>
                <option value="cyber_neon">Template: Cyberpunk Neon Stage</option>
              </select>
              <button
                onClick={handleLoadSampleBatch}
                className="px-4 py-2.5 rounded-xl text-xs font-bold border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 flex items-center gap-2"
              >
                <FolderPlus className="w-4 h-4" />
                <span>{t.batch.loadSampleBatch}</span>
              </button>
              <button
                onClick={handleRunBatchQueue}
                disabled={batchItems.length === 0 || isBatchRunning}
                className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>{isBatchRunning ? 'Running Batch AI...' : t.batch.processAll}</span>
              </button>
            </div>
          </div>

          {batchItems.length === 0 ? (
            <div className={`p-12 rounded-2xl border-2 border-dashed text-center space-y-4 ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-300 bg-white'}`}>
              <Layers className="w-12 h-12 text-indigo-400 mx-auto" />
              <h3 className="text-lg font-bold">Load Sample Catalog to Test Batch Studio</h3>
              <button
                onClick={handleLoadSampleBatch}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white"
              >
                {t.batch.loadSampleBatch}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {batchItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl border overflow-hidden flex flex-col ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}
                >
                  <div className="relative aspect-square bg-slate-950 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.resultUrl || item.originalUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                    <span
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'done'
                          ? 'bg-emerald-500 text-white'
                          : item.status === 'processing'
                          ? 'bg-amber-400 text-slate-950 animate-pulse'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold truncate">{item.name}</span>
                    {item.resultUrl && (
                      <a
                        href={item.resultUrl}
                        download={`batch-${item.name}`}
                        className="p-1.5 rounded-lg bg-indigo-600 text-white"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ====================================================================
          PAGE 3: PRICING (bKash / Nagad / SSLCommerz & Stripe)
      ==================================================================== */}
      {activePage === 'pricing' && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold">{t.pricing.title}</h2>
            <p className="text-sm text-slate-400">{t.pricing.subtitle}</p>
            <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setCurrency('BDT')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                  currency === 'BDT' ? 'bg-pink-600 text-white' : 'text-slate-400'
                }`}
              >
                🇧🇩 BDT (৳) • bKash / Nagad / SSLCommerz
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                  currency === 'USD' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                🌐 USD ($) • Stripe Global
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Free Creator Studio',
                priceBDT: '৳০',
                priceUSD: '$0',
                desc: 'On-device WebGPU processing with standard resolution.',
                features: ['Unlimited standard cutouts', '3D Marble & Sunlit Podiums', 'Magic Brush & Alpha Mask view'],
                cta: 'Active Free Plan',
                highlight: false,
              },
              {
                name: 'Photoroom Seller Pro',
                priceBDT: '৳৭৯০ / মাস',
                priceUSD: '$9 / month',
                desc: 'For Daraz, Shopify & F-Commerce sellers needing HD batch studio.',
                features: ['500 Ultra-HD 4K renders/mo', 'Batch Studio (50 items at once)', '3D Depth Typography & Relighting', 'bKash / Nagad instant activation'],
                cta: currency === 'BDT' ? 'বিকাশ / নগদ দিয়ে পেমেন্ট করুন' : 'Subscribe with Stripe',
                highlight: true,
              },
              {
                name: 'Enterprise GPU API',
                priceBDT: '৳৩,৪৯০ / মাস',
                priceUSD: '$39 / month',
                desc: 'Dedicated BiRefNet FP16 GPU cluster for high-volume apps.',
                features: ['5,000 REST API calls/mo', 'Sub-second FastAPI GPU queue', 'Zero-retention 1-hour auto-delete SLA'],
                cta: 'Get API Access',
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border flex flex-col justify-between ${
                  plan.highlight
                    ? 'border-indigo-500 bg-gradient-to-b from-indigo-950/40 to-slate-900 shadow-xl'
                    : darkMode
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-extrabold">{plan.name}</h3>
                  <div className="text-3xl font-black">
                    {currency === 'BDT' ? plan.priceBDT : plan.priceUSD}
                  </div>
                  <p className="text-xs text-slate-400">{plan.desc}</p>
                  <ul className="space-y-2 pt-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setCredits((c) => c + 100);
                    showNotification(`Added +100 Pro Credits via ${currency === 'BDT' ? 'bKash Checkout' : 'Stripe'}!`);
                  }}
                  className={`mt-6 w-full py-3 rounded-xl text-xs font-extrabold ${
                    plan.highlight ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-800 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE 4: DEVELOPER API PLAYGROUND
      ==================================================================== */}
      {activePage === 'api' && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-indigo-400" />
                  <span>REST API Playground (BiRefNet + Studio Templates)</span>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <code className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400">
                  {apiKey}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(apiKey);
                    showNotification('API Key Copied!');
                  }}
                  className="p-2 rounded-xl bg-slate-800 text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
{`curl -X POST https://api.clearcut.ai/v1/studio-render \\
  -H "X-API-Key: ${apiKey}" \\
  -F "image_file=@perfume.jpg" \\
  -F "template=podium_marble" \\
  -F "shadow_mode=contact" \\
  -F "depth_text=LUXURY" \\
  -o studio_output.png`}
            </pre>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE 5: ARCHITECTURE & COMMERCIAL LICENSE
      ==================================================================== */}
      {activePage === 'faq' && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className={`p-6 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>Commercial Architecture (BiRefNet Apache-2.0 + Photoroom Canvas Pipeline)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This application combines <strong>BiRefNet (Apache-2.0 commercial license)</strong> via ONNX Runtime WebGPU with a multi-layer HTML5 Canvas compositing engine capable of rendering 3D product podiums, elliptical ground contact shadows, color spill defringing, Rubylith mask overlays, and depth-of-field typography behind subjects.
            </p>
          </div>
        </main>
      )}
    </div>
  );
}
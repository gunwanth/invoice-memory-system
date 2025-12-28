# Invoice Memory System

AI-Driven Memory Layer for Document Automation

## Overview

This project implements a memory-driven learning system for invoice
processing. It simulates how intelligent automation systems improve over
time by learning from human corrections instead of relying on
traditional machine learning training.

The system stores reusable knowledge, applies it to future invoices, and
maintains explainable and auditable decision logic.

------------------------------------------------------------------------

## Problem Statement

Organizations process large volumes of invoices daily. Many corrections
repeat: - Vendor-specific labels - VAT handling - SKU mapping - Quantity
mismatches

These corrections are often wasted and not reused.

This project solves that problem by introducing a **persistent memory
layer** that learns from human approvals and improves automation
quality.

------------------------------------------------------------------------

## Core Goals

-   Store reusable invoice insights
-   Apply learning automatically
-   Provide explainable decisions
-   Track confidence evolution
-   Support human-in-the-loop workflows
-   Persist memory across runs

------------------------------------------------------------------------

## Technology Stack

### Backend

-   Node.js
-   TypeScript (strict)
-   Express
-   SQLite

### Frontend

-   React + TypeScript
-   Tailwind CSS (CDN)
-   Fetch API

------------------------------------------------------------------------

## System Architecture

Frontend → Backend → Memory Engine → SQLite

### Backend Components

-   Recall Engine
-   Apply Engine
-   Decision Engine
-   Learning Engine
-   Audit Logger

------------------------------------------------------------------------

## Memory Types

### Vendor Memory

Stores vendor-specific rules: - Service date labels - VAT inclusion -
SKU mappings

### Correction Memory

Stores repeated correction patterns with confidence values.

### Resolution Memory

Tracks approval or rejection outcomes.

------------------------------------------------------------------------

## Processing Pipeline

1.  Recall memory
2.  Apply rules
3.  Decide action
4.  Learn from human feedback

------------------------------------------------------------------------

## Output Contract

``` json
{
  "normalizedInvoice": {},
  "proposedCorrections": [],
  "requiresHumanReview": true,
  "reasoning": "",
  "confidenceScore": 0.0,
  "memoryUpdates": [],
  "auditTrail": []
}
```

------------------------------------------------------------------------

## Demo Flow

### Example 1 -- Learning Phase

Invoice:

    Supplier GmbH
    Leistungsdatum: 2024-01-10

Result: - Requires review - Approved by user - Memory updated

### Example 2 -- Automatic Application

    Supplier GmbH
    Leistungsdatum: 2024-02-15

Result: - Memory applied automatically - Higher confidence

------------------------------------------------------------------------

## Supported Learning Cases

-   Supplier GmbH → service date extraction
-   Parts AG → VAT inclusion detection
-   Freight & Co → SKU FREIGHT mapping
-   Duplicate invoice detection

------------------------------------------------------------------------

## Confidence Logic

-   Confidence increases on approval
-   Confidence decreases on rejection
-   Threshold prevents unsafe automation

------------------------------------------------------------------------

## Audit Trail

Each step logs: - recall - apply - decide - learn

Ensuring traceability and explainability.

------------------------------------------------------------------------

## Frontend Features

-   Invoice editor
-   Process button
-   Approve / Reject controls
-   Memory viewer
-   Demo runner
-   Styled UI

------------------------------------------------------------------------

## Running the Project

### Backend

``` bash
cd backend
npm install
npm run build
npm run start
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

Open in browser:

    http://localhost:5173

------------------------------------------------------------------------

## Summary

This project demonstrates: - Memory-based learning - Human-in-the-loop
AI - Explainable automation - Persistent reasoning - Production-style
design

------------------------------------------------------------------------

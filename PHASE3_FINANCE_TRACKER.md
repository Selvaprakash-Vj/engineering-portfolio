# Phase 3.3 — Finance Tracker Automation

This release adds the second project case study to Selva Engineering Lab.

## New route

- `?project=finance-tracker`

## Portfolio changes

- The Finance Tracker project card now opens a full case-study page.
- The project is presented as an operational private system with a public architecture case study.
- The source repository and financial data remain private.
- The portfolio status strip now reports two online case studies.

## Case-study narrative

1. The engineering problem
2. End-to-end workflow
3. Human-in-the-loop control
4. Workflow safeguards
5. Current system state
6. Private boundary and public-release roadmap

## Core design principle

Existing nonblank human comments remain authoritative. Machine learning is used only for genuinely unlabelled transactions.

## Public-release boundary

A future public version should remove personal paths and categories, use configuration files, include synthetic sample statements, abstract provider parsers, add automated tests, and ship with a clean CLI and documentation.

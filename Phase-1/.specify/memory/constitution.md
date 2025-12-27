<!--
Sync Impact Report:
Version change: None (initial creation) -> 0.1.0
List of modified principles: None (initial creation)
Added sections: None (initial creation, filled existing template)
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending (check for "Constitution Check" alignment)
- .specify/templates/spec-template.md: ⚠ pending (check for scope/requirements alignment)
- .specify/templates/tasks-template.md: ⚠ pending (check for task categorization)
- .gemini/commands/sp.adr.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.analyze.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.checklist.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.clarify.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.constitution.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.git.commit_pr.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.implement.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.phr.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.plan.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.reverse-engineer.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.specify.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.tasks.toml: ✅ updated (checked, no specific constitution placeholders)
- .gemini/commands/sp.taskstoissues.toml: ✅ updated (checked, no specific constitution placeholders)
Follow-up TODOs: None
-->
<div id="project-constitution"></div>

# Project Constitution: Todo In-Memory Python Console App

## 1. Introduction

This document, the Project Constitution, outlines the core principles, governance model, and foundational guidelines for the development and evolution of the Todo In-Memory Python Console App project. It serves as a single source of truth for all stakeholders, ensuring alignment, clarity, and consistency in decision-making and execution.

*   **Ratification Date**: 2025-12-26
*   **Last Amended Date**: 2025-12-26
*   **Constitution Version**: 0.1.0

## 2. Core Principles

These principles are the non-negotiable tenets guiding all aspects of the project. Adherence to these principles is mandatory for all contributions.

### 2.1. Feature Completeness

All 5 Basic Level features (Add, Delete, Update, View, Mark Complete) MUST be implemented to ensure core functionality.

### 2.2. Spec-Driven Development

Development MUST follow a spec-driven approach using Claude Code and Spec-Kit Plus. No manual coding is permitted; all implementation MUST be generated via Claude Code.

### 2.3. Code Quality and Structure

The project MUST adhere to clean code principles and maintain a proper Python project structure.

### 2.4. Agentic Development

The prescribed Agentic Dev Stack workflow (Write spec → Generate plan → Break into tasks → Implement via Claude Code) MUST be followed for all development phases.

## 3. Technology Stack

The foundational technologies and frameworks chosen for the project. Deviations require explicit approval.

*   **Core Languages**: Python 3.13+
*   **Frameworks**: N/A
*   **Key Libraries/Tools**: UV, Claude Code, Spec-Kit Plus

## 4. Development Approach

The prescribed methodologies and workflows for development.

*   **Methodology**: Agentic Dev Stack workflow: Write spec → Generate plan → Break into tasks → Implement via Claude Code.
*   **Tools**: Claude Code, Spec-Kit Plus

## 5. Deliverables

The expected outputs and artifacts of the project.

*   **Primary Deliverables**: A working command-line console application capable of: Adding tasks with title and description, Listing all tasks with status indicators, Updating task details, Deleting tasks by ID, Marking tasks as complete/incomplete.
*   **Documentation Deliverables**: A GitHub repository containing: The Constitution file, a `specs` history folder with all specification files, a `/src` folder with Python source code, a `README.md` with setup instructions, and a `CLAUDE.md` with Claude Code instructions.

## 6. Governance

This section defines how decisions are made, conflicts resolved, and the constitution itself is maintained.

### 6.1. Amendment Procedure

This Constitution may be amended by a unanimous decision of the project's core contributors. Proposed amendments must be reviewed and approved by all designated stakeholders.

### 6.2. Versioning Policy

The Constitution versioning follows Semantic Versioning (MAJOR.MINOR.PATCH). MAJOR increments for backward-incompatible changes (e.g., principle removal), MINOR for new sections or material expansions, and PATCH for clarifications or typos.

### 6.3. Compliance Review

Adherence to this Constitution will be reviewed quarterly by the project lead. Any deviations must be documented and addressed immediately.

## 7. Change Log

Placeholder for future amendments.
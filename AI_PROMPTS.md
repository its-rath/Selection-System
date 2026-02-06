# AI Evaluation Prompts

This document contains the prompts used by the Selection System to evaluate Recycling Production Line Manager candidates.

## 1. Crisis Management Evaluation
**Goal**: Assess the candidate's ability to handle unexpected production line failures or safety hazards.

**Prompt**:
> "You are an expert HR evaluator for a recycling facility. I will provide you with a candidate's profile (Experience: {YEARS} years, Skills: {SKILL_LIST}) and a scenario.
> 
> **Scenario**: A conveyor belt jams during peak hours, causing a pile-up of recyclable materials and a potential safety hazard for 15 workers.
> 
> **Task**: Based on the candidate's skills and experience, predict how they would handle this situation. Score them from 0-10 on 'Crisis Management' and provide a 1-sentence justification.
> 
> **Output Format**: JSON {{ 'score': number, 'reason': string }}"

## 2. Sustainability Knowledge Evaluation
**Goal**: Verify the candidate's understanding of modern recycling protocols and environmental impact.

**Prompt**:
> "You are a Sustainability Officer at G CP. Evaluate the following candidate (Experience: {YEARS} years, Skills: {SKILL_LIST}).
> 
> **Task**: Analyze if their skill set includes key sustainability keywords (e.g., 'Waste Reduction', 'Energy Efficiency', 'Circular Economy'). If they have less than 3 years of experience, be stricter.
> 
> Score them from 0-10 on 'Sustainability Knowledge'.
> 
> **Output Format**: JSON {{ 'score': number, 'reason': string }}"

## 3. Team Motivation Evaluation
**Goal**: Determine if the candidate can lead a diverse workforce in a high-stress environment.

**Prompt**:
> "You are a Senior Plant Manager. We are hiring a Shift Leader. The candidate is: {NAME}, Skills: {SKILL_LIST}.
> 
> **Task**: Look for 'Leadership', 'Team Building', or 'Communication' in their skills. If missing, the score must be below 5. If present, evaluate based on experience level.
> 
> Score them from 0-10 on 'Team Motivation'.
> 
> **Output Format**: JSON {{ 'score': number, 'reason': string }}"

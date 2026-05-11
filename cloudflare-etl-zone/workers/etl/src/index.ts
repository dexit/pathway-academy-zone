// ETL worker: hosts FormETLWorkflow.
// The gateway worker triggers it via a cross-script Workflow binding.
// This worker has no HTTP fetch handler — it only serves Workflow instances.

export { FormETLWorkflow } from './workflow';

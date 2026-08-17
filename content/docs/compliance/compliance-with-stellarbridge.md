---
title: Compliance with stellarbridge
---

stellarbridge is designed to minimize the compliance work required to
operate securely and meet common regulatory and assurance requirements.

This page summarizes key information you may need as you update your
policies, procedures, and controls. It is organized by control areas that
commonly appear across frameworks (for example SOC 2, HIPAA, and similar
programs).

Each section includes:

- A short explanation of how the control area is handled in stellarbridge
- A **Shared Responsibility Table (SRT)** describing what **you (the
  customer)** are responsible for versus what **stellarbridge** is
  responsible for

## Collecting compliance evidence

As part of your compliance program, you will typically collect artifacts
and evidence from stellarbridge to support your own audits and
assessments.

Common options include:

1. Request third-party audit letters and reports (for example SOC 2
   Type II, HIPAA, vulnerability reports). These are available through
   the stellarbridge Trust Portal and may require an NDA.
2. Submit a security questionnaire. Turnaround is typically same-day
   (often within hours), and questionnaires can be useful even if you
   already have formal reports.

To request reports, artifacts, and other evidence, create an account at
`https://trust.stellarbridge.app`. If you are an existing customer, the
Trust Portal account is separate from your stellarbridge application
account.

A user guide for the Trust Portal is available here: [Trust Portal user
manual](/docs/trust-portal/user-manual/).

### Table of Contents

- [Access Control](#access-control)
- [Audit Logging](#audit-logging)
- [Encryption](#encryption)
- [Identity and Access Management](#identity-and-access-management)
- [Incident Response](#incident-response)
- [Physical Security](#physical-security)
- [Risk Management](#risk-management)
- [Security Awareness](#security-awareness)

---

## Access Control

Access control is the process of limiting access to systems and data
based on identity and authorization. In stellarbridge, access control is
implemented using **roles and permissions (RBAC)**.

For a full list of roles and permissions, see [RBAC](/docs/security/rbac/).

**Shared Responsibility Table (SRT)**

| Owner         | Responsibility                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| Customer      | Provision users and service accounts, and assign roles according to least privilege                     |
| Customer      | Review access periodically (for example quarterly) and remove access that is no longer required         |
| Customer      | Disable or remove users promptly when access is no longer needed (for example termination, role change) |
| Customer      | Enforce strong authentication for your users (for example MFA where available) and protect credentials  |
| Customer      | Protect and rotate API keys and integration secrets, and limit their permissions                        |
| stellarbridge | Provide RBAC controls to enforce authorized actions based on configured roles and permissions           |
| stellarbridge | Implement secure authentication, session management, and platform-level authorization enforcement       |
| stellarbridge | Log administrative and security-relevant actions performed in the platform                              |
| stellarbridge | Operate and secure the underlying platform and infrastructure that supports access control              |

---

## Audit Logging

Audit logging records security-relevant events so you can investigate
issues, detect suspicious activity, and demonstrate compliance.

stellarbridge records platform events and provides customer-accessible
audit logs. Customers are expected to integrate these logs into their
broader monitoring and retention processes when required.

**Shared Responsibility Table (SRT)**

| Owner         | Responsibility                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| Customer      | Review audit logs (and related alerts) for suspicious activity and take action per your incident response process |
| Customer      | Export audit logs to your SIEM/log management system when you have monitoring or retention requirements           |
| Customer      | Control which users can access audit logs within your organization                                                |
| stellarbridge | Record relevant platform events in a structured format                                                            |
| stellarbridge | Store audit logs in a tamper-resistant manner while within stellarbridge systems                                  |
| stellarbridge | Restrict audit log access to authorized users as configured by the customer                                       |
| stellarbridge | Maintain the logging infrastructure and availability of audit logging features                                    |

**Note:** stellarbridge retains customer-accessible audit logs for
**30 days**. If you have regulatory or internal retention requirements
beyond that window, export logs and retain them according to your
policies.

Refer to the audit log export documentation: [Export logs to
SIEM](/docs/guides/security/).

---

## Encryption

Encryption protects data **in transit** and **at rest**.

- **In transit:** communications between clients and the platform are
  encrypted using TLS.
- **At rest:** data stored by stellarbridge is encrypted using
  industry-standard mechanisms.

If your organization requires additional encryption controls (for example
customer-managed keys, client-side encryption, or field-level
encryption), evaluate whether those requirements can be met by
configuration and process, or whether you need supplemental controls
outside stellarbridge.

**Shared Responsibility Table (SRT)**

| Owner         | Responsibility                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Customer      | Classify data and determine whether additional encryption controls are required for your use case                |
| Customer      | Protect secrets used to access stellarbridge (API keys, integration credentials, tokens)                         |
| Customer      | Ensure endpoints you control (browsers, devices, networks) are secured so encrypted sessions are not compromised |
| stellarbridge | Encrypt data in transit using TLS                                                                                |
| stellarbridge | Encrypt data at rest within stellarbridge-managed storage systems                                                |
| stellarbridge | Manage platform key management processes appropriate to the service design                                       |
| stellarbridge | Maintain secure cryptographic configurations and update them over time                                           |

---

## Identity and Access Management

Identity and access management (IAM) includes authentication,
authorization, and lifecycle processes (joiner/mover/leaver) for people
and systems accessing stellarbridge.

stellarbridge provides organization-level access controls. You are
responsible for your internal identity governance (for example,
approvals, offboarding, and identity proofing) and for configuring
stellarbridge to align with your IAM policies.

**Shared Responsibility Table (SRT)**

| Owner         | Responsibility                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| Customer      | Define IAM policies (who may have access, approval flows, offboarding timelines, password/MFA requirements) |
| Customer      | Maintain your identity provider and user directory hygiene (if you use SSO/IdP integrations)                |
| Customer      | Ensure users access stellarbridge from managed and monitored devices/networks where required                |
| stellarbridge | Provide platform authentication mechanisms supported by the service                                         |
| stellarbridge | Enforce authorization based on roles and permissions configured in the platform                             |
| stellarbridge | Provide features that support secure session handling and account security                                  |

---

## Incident Response

Incident response is the process of detecting, investigating,
containing, and recovering from security incidents.

stellarbridge is responsible for responding to incidents that impact
the stellarbridge platform and its underlying infrastructure. You are
responsible for responding to incidents within your environment,
including compromised user accounts, misconfiguration, or misuse of
credentials.

**Shared Responsibility Table (SRT)**

| Owner         | Responsibility                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| Customer      | Maintain an incident response plan and runbooks for your organization                                          |
| Customer      | Investigate and respond to suspected compromise of your users, devices, credentials, or integrations           |
| Customer      | Use exported logs and internal telemetry to support investigations and required reporting                      |
| stellarbridge | Monitor for and respond to incidents affecting stellarbridge systems                                           |
| stellarbridge | Preserve and make available relevant platform-side evidence consistent with contractual and legal requirements |
| stellarbridge | Communicate security incidents to customers consistent with applicable obligations                             |

---

## Physical Security

Physical security protects facilities, hardware, and the environment
where systems operate.

stellarbridge relies on physical security controls provided by its
sub-processors (for example, cloud hosting providers). A list of
sub-processors is available here: [Third-party
processors](/docs/privacy/3rd-party-processors/).

**Shared Responsibility Table (SRT)**

| Owner         | Responsibility                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------- |
| Customer      | Secure your physical premises, endpoints, and any networks used to access stellarbridge            |
| Customer      | Ensure proper disposal and lifecycle management of devices that access stellarbridge               |
| stellarbridge | Select and manage sub-processors that provide appropriate physical security controls               |
| stellarbridge | Maintain vendor oversight processes and make relevant documentation available via the Trust Portal |

---

## Risk Management

Risk management includes identifying, assessing, and mitigating risks
related to your use of stellarbridge, as well as ongoing vendor
management.

**Shared Responsibility Table (SRT)**

| Owner         | Responsibility                                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Customer      | Perform a risk assessment for stellarbridge aligned to your risk methodology and compliance requirements                                |
| Customer      | Define compensating controls when your risk assessment requires them (for example additional monitoring, DLP, stricter access controls) |
| Customer      | Track and re-assess risks periodically or when your usage changes                                                                       |
| stellarbridge | Maintain a security program and provide security documentation and evidence (for example audit reports)                                 |
| stellarbridge | Maintain vulnerability management and security improvement processes for the platform                                                   |

---

## Security Awareness

Security awareness ensures that people understand how to handle data
securely and recognize common threats such as phishing and social
engineering.

**Shared Responsibility Table (SRT)**

| Owner         | Responsibility                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| Customer      | Train your workforce on secure use of stellarbridge (least privilege, MFA, data handling, and phishing awareness) |
| Customer      | Establish acceptable use policies and enforce them for all users with access                                      |
| stellarbridge | Train stellarbridge personnel and maintain internal security policies and procedures                              |
| stellarbridge | Limit and monitor internal access to customer data consistent with the service design and policies                |

---

## FAQ: Compliance with stellarbridge

**Q: What compliance standards does stellarbridge support?**

A: stellarbridge commonly supports customer compliance efforts with:

1. SOC 2 Type II
2. HIPAA
3. FedRAMP Moderate (planned; target 2027)

Availability of reports and the latest status are provided via the
Trust Portal.

**Q: What is the turnaround time for security questionnaires?**

A: Typical turnaround is same-day (often within **6 hours**), depending
on questionnaire length and complexity.

**Q: Can I self-host stellarbridge to meet compliance requirements?**

A: Yes. Self-hosting may be an option for some customers with specific
requirements. Because deployment documentation can include sensitive
implementation details, access may require an NDA.

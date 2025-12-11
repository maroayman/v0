/**
 * @fileoverview Certifications Data and Utilities
 *
 * This file contains the centralized certifications data for the portfolio.
 * Certifications are displayed in reverse chronological order (newest first).
 *
 * @example Adding a new certification:
 * ```typescript
 * {
 *   title: "AWS Solutions Architect Associate",
 *   provider: "Amazon Web Services",
 *   issued: "Dec 2025",
 *   expires: "Dec 2028",           // Optional: omit if no expiration
 *   credentialId: "ABC123XYZ",     // Optional: omit if no ID
 *   credentialUrl: "https://...",  // Optional: link to verify credential
 * }
 * ```
 *
 * @example How to add a new certification:
 * 1. Add new entry at the TOP of the certifications array (most recent first)
 * 2. Fill in required fields: title, provider, issued
 * 3. Add optional fields if available: expires, credentialId, credentialUrl
 * 4. Set isTemplate: true only for example/template entries
 */

/**
 * Certification entry type definition
 * @typedef {Object} Certification
 * @property {string} title - Name of the certification
 * @property {string} provider - Issuing organization (e.g., "AWS", "Google Cloud", "Huawei")
 * @property {string} issued - Issue date (e.g., "Jan 2025", "December 2025")
 * @property {string} [expires] - Optional expiration date (e.g., "Jan 2028"). Omit if the certification doesn't expire
 * @property {string} [credentialId] - Optional credential ID/number for verification
 * @property {string} [credentialUrl] - Optional URL to verify the credential online
 * @property {boolean} [isTemplate] - Optional flag to mark template entries (hidden from display)
 */

/**
 * Array of certification entries, ordered by issue date (newest first).
 * @type {Certification[]}
 */
export const certifications = [
    // ============================================================
    // TEMPLATE ENTRY: Copy and modify this when adding a new certification
    // INSTRUCTIONS FOR LLMs:
    // 1. Copy this entire object
    // 2. Update all fields with real certification data
    // 3. Remove isTemplate: true
    // 4. Add the new entry at the TOP of the certifications array (newest first)
    // 5. Remove optional fields (expires, credentialId, credentialUrl) if not applicable
    // ============================================================
    /**
     * @template Example certification entry showing all available fields.
     * This is a complete example of how to structure a certification.
     * When using: Remove @template tag, update all fields, remove isTemplate property.
     */
    {
        title: "Example Cloud Certification",
        provider: "Example Cloud Provider",
        issued: "Jan 2025",
        expires: "Jan 2028",                                    // Optional: remove if no expiration
        credentialId: "EXAMPLE-123456",                         // Optional: remove if no ID
        credentialUrl: "https://example.com/verify/123456",     // Optional: remove if no URL
        isTemplate: true,                                       // Mark as template to hide from display
    },
    // ============================================================
    // END TEMPLATE - Real entries below (newest first)
    // ============================================================

    // REAL CERTIFICATION ENTRIES
    // Add new certifications at the TOP of this section (most recent first)

    {
        title: "Introduction to AWS Cloud: Builder Labs Learning Plan",
        provider: "AWS Training & Certification",
        issued: "Aug 2025",
    },
    {
        title: "Introduction to Kubernetes",
        provider: "The Linux Foundation",
        issued: "May 2025",
        credentialId: "LF-bf9suctsic",
    },
    {
        title: "Introduction to Cloud Infrastructure Technologies",
        provider: "The Linux Foundation",
        issued: "May 2025",
        credentialId: "LF-y5lenp6vi7",
    },
    {
        title: "Introduction to Linux",
        provider: "The Linux Foundation",
        issued: "May 2025",
        credentialId: "LF-bqjbi9w04l",
    },
    {
        title: "HCCDA - AI",
        provider: "Huawei",
        issued: "Mar 2025",
        expires: "Mar 2028",
        credentialId: "HWENDCAIDA304070",
    },
    {
        title: "HCCDA - Tech Essentials",
        provider: "Huawei",
        issued: "Jan 2025",
        expires: "Jan 2028",
        credentialId: "HWDCTEDA695884",
    },
];

/**
 * Get all real certifications (excludes template entries).
 * @returns {Certification[]} Array of certification objects
 */
export function getCertifications() {
    return certifications.filter((cert) => !cert.isTemplate);
}

/**
 * Get certifications count (excludes template entries).
 * @returns {number} Total number of certifications
 */
export function getCertificationsCount() {
    return getCertifications().length;
}

// This file is used by Code Analysis to maintain SuppressMessage attributes that are applied to this project.
// Project-level suppressions either have no target or are given a specific target and scoped to a namespace, type, member, etc.

using System.Diagnostics.CodeAnalysis;

[assembly: SuppressMessage("Design", "CA1031:Do not catch general exception types")]
[assembly: SuppressMessage("Performance", "CA1848:Use the LoggerMessage delegates")]
[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task")]
[assembly: SuppressMessage("Design", "CA1062:Validate arguments of public methods")]
[assembly: SuppressMessage("Usage", "CA2254:Template should be a static expression")]
[assembly: SuppressMessage("Performance", "CA1812:Avoid uninstantiated internal classes")]
[assembly: SuppressMessage("Performance", "CA1819:Properties should not return arrays")]
[assembly: SuppressMessage("Design", "CA1002:Do not expose generic lists")]

// These are all suppressions related to generated migrations, and therefore are not manually written.
[assembly: SuppressMessage("Style", "IDE0161:Convert to file-scoped namespace", Justification = "Generated code.", Scope = "namespaceanddescendants", Target = "WebDoomerApi.Data.Migrations")]
[assembly: SuppressMessage("Design", "CA1062:Validate arguments of public methods", Justification = "Generated code.", Scope = "namespaceanddescendants", Target = "WebDoomerApi.Data.Migrations)")]
[assembly: SuppressMessage("Style", "IDE0058:Expression value is never used", Justification = "Generated code.", Scope = "namespaceanddescendants", Target = "WebDoomerApi.Data.Migrations)")]
[assembly: SuppressMessage("Style", "IDE0053:Use expression body for lambda expression", Justification = "Generated code.", Scope = "namespaceanddescendants", Target = "WebDoomerApi.Data.Migrations)")]

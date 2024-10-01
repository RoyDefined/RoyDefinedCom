namespace RoyDefinedComApi.Data;

/// <summary>
/// Represents the database configuration instance used in order to configure the current database.
/// </summary>
public class DatabaseConfiguration
{
    /// <summary>
    /// The connection string used to connect to the database.
    /// </summary>
    public string? ConnectionString { get; init; }
}

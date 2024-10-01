using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace RoyDefinedComApi.Data;

// Add initial: Add-Migration InitialMigration -Context DatabaseContext -OutputDir Data\Migrations -StartupProject RoyDefinedComApi
// Add subsequent: Add-Migration <Migration> -Context DatabaseContext -StartupProject RoyDefinedComApi
// Update: Update-Database -Context DatabaseContext -StartupProject RoyDefinedComApi
// Remove: Remove-Database -Context DatabaseContext -StartupProject RoyDefinedComApi

/// <inheritdoc/>
internal sealed class DatabaseContext : DbContext
{
    private readonly ILogger _logger;
    private readonly DatabaseConfiguration _configuration;

    public DatabaseContext(
        ILogger<DatabaseContext> logger,
        DatabaseConfiguration configuration)
    {
        this._logger = logger;
		this._configuration = configuration;
    }

    // Models

    /// <inheritdoc cref="DataStat"/>
    public DbSet<DataStat> Stats { get; private set; }

    /// <inheritdoc/>
	protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        ArgumentNullException.ThrowIfNull(modelBuilder, nameof(modelBuilder));

        _ = modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatabaseContext).Assembly);
    }

    /// <inheritdoc/>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        ArgumentNullException.ThrowIfNull(optionsBuilder, nameof(optionsBuilder));

        if (optionsBuilder.IsConfigured)
        {
            return;
        }

        var connectionString =
#if DEBUG
        this._configuration.ConnectionString;
#else
        Environment.GetEnvironmentVariable("CONNECTIONSTRING");
#endif

        ArgumentNullException.ThrowIfNullOrEmpty(connectionString, nameof(connectionString));

        this._logger.LogDebug("Connection string used: {ConnectionString}", connectionString);
        _ = optionsBuilder.UseNpgsql(connectionString);

        // Log anything to our logger.
        _ = optionsBuilder.LogTo(message => this._logger.LogDebug(message));
    }
}


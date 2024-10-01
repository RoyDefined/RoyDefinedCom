using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RoyDefinedComApi.Data;

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

/// <summary>
/// Table for statistics.
/// </summary>
[Table(DataStat.TableName)]
public sealed class DataStat
{
	internal const string TableName = "Stats";

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

	// Columns
	public string Key { get; internal set; }
	public int Value { get; internal set; }

    // Relation builder
    internal sealed class DataStatBuilder : IEntityTypeConfiguration<DataStat>
    {
        public void Configure(EntityTypeBuilder<DataStat> builder)
        {
        }
    }
}

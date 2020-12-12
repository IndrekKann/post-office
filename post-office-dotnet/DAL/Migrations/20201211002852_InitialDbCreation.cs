using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class InitialDbCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Shipments",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ShipmentNumber = table.Column<string>(nullable: false),
                    Airport = table.Column<int>(nullable: false),
                    FlightNumber = table.Column<string>(nullable: false),
                    FlightDate = table.Column<DateTime>(nullable: false),
                    IsFinalized = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bag",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ShipmentId = table.Column<Guid>(nullable: false),
                    BagNumber = table.Column<string>(maxLength: 15, nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    LetterCount = table.Column<int>(nullable: true),
                    Weight = table.Column<decimal>(type: "decimal(18,3)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bag", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bag_Shipments_ShipmentId",
                        column: x => x.ShipmentId,
                        principalTable: "Shipments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Parcels",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    BagId = table.Column<Guid>(nullable: false),
                    ParcelNumber = table.Column<string>(nullable: false),
                    RecipientName = table.Column<string>(maxLength: 100, nullable: false),
                    DestinationCountry = table.Column<string>(nullable: false),
                    Weight = table.Column<decimal>(type: "decimal(18,3)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ParcelBagId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parcels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Parcels_Bag_BagId",
                        column: x => x.BagId,
                        principalTable: "Bag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Parcels_Bag_ParcelBagId",
                        column: x => x.ParcelBagId,
                        principalTable: "Bag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bag_ShipmentId",
                table: "Bag",
                column: "ShipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_BagId",
                table: "Parcels",
                column: "BagId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_ParcelBagId",
                table: "Parcels",
                column: "ParcelBagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parcels");

            migrationBuilder.DropTable(
                name: "Bag");

            migrationBuilder.DropTable(
                name: "Shipments");
        }
    }
}

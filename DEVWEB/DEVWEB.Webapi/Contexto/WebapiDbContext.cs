using DEVWEB.Webapi.Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Contexto
{
    public class WebapiDbContext : DbContext
    {
        public WebapiDbContext(DbContextOptions<WebapiDbContext> opciones)
            : base(opciones)
        {

        }

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Catedratico> Catedratico { get; set; }
        public DbSet<Estudiante> Estudiante { get; set; }
        public DbSet<Carrera> Carrera { get; set; }
        public DbSet<Jornada> Jornada { get; set; }
        public DbSet<Programacion> Programacion { get; set; }
        public DbSet<Curso> Curso { get; set; }
        public DbSet<Publicacion> Publicacion { get; set; }
        public DbSet<Actividad> Actividad { get; set; }
        public DbSet<Administrador> Administrador { get; set; }

    }
}

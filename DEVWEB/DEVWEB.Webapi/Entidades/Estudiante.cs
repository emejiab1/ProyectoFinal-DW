using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Estudiante
    {
        [Key]
        public int idEstudiante { get; set; }
        public int carrera_idCarrera { get; set; }
        public string usuario_idUsuario { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Curso
    {
        [Key]
        public int idCurso { get; set; }
        public string nombreCurso { get; set; }
        public int semestre { get; set; }
        public int carrera_idCarrera { get; set; }
    }
}

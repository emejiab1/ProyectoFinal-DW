using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Programacion
    {
        [Key]
        public int idProgramacion { get; set; }
        public string seccion { get; set; }
        public string horario { get; set; }
        public int curso_idCurso { get; set; }
        public int jornada_idJornada { get; set; }
        public int catedratico_idCatedratico { get; set; }

    }
}

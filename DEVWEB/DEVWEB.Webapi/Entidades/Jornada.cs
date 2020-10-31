using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Jornada
    {
        [Key]
        public int idJornada { get; set; }
        public string dia { get; set; }
        public string ubicacion { get; set; }
        public int carrera_idCarrera { get; set; }
    }
}

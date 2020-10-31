using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Actividad
    {
        [Key]
        public int idActividad { get; set; }
        public string tituloActividad { get; set; }
        public string descripcionActividad { get; set; }
        public string fechaInicio { get; set; }
        public string fechaFin { get; set; }
        public int carrera_idCarrera { get; set; }
    }
}

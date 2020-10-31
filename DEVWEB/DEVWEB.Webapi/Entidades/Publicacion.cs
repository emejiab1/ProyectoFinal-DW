using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Publicacion
    {
        [Key]
        public int idPublicacion { get; set; }
        public string tipoPublicacion { get; set; }
        public string tituloPublicacion { get; set; }
        public string informacionPublicacion { get; set; }
        public string videoPublicacion { get; set; }
        public string imagenPublicacion { get; set; }
        public int carrera_idCarrera { get; set; }
    }
}

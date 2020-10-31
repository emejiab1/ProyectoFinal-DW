using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Usuario
    {
        [Key]
        public string idUsuario { get; set; }
        public string nombre { get; set; }
        public string contraseña { get; set; }

    }
}

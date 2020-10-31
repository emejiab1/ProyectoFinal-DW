using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Administrador
    {
        [Key]
        public string usuario { get; set; }
        public string contraseña { get; set; }
    }
}

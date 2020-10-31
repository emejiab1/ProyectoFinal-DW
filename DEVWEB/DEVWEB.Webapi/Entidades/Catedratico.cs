using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Catedratico
    {
        [Key]
        public int idCatedratico { get; set; }
        public string usuario_idUsuario { get; set; }

    }
}

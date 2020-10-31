using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEVWEB.Webapi.Entidades
{
    public class Carrera
    {
        [Key]
        public int idCarrera { get; set; }
        public string nombreCarrera { get; set; }

    }
}

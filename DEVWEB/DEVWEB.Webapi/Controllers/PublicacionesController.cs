using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DEVWEB.Webapi.Contexto;
using DEVWEB.Webapi.Entidades;
using Microsoft.AspNetCore.Cors;

namespace DEVWEB.Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicacionesController : ControllerBase
    {
        private readonly WebapiDbContext _context;

        public PublicacionesController(WebapiDbContext context)
        {
            _context = context;
        }

        // GET: api/Publicaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Publicacion>>> GetPublicacion()
        {
            return await _context.Publicacion.ToListAsync();
        }

        // GET: api/Publicaciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Publicacion>> GetPublicacion(int id)
        {
            var publicacion = await _context.Publicacion.FindAsync(id);

            if (publicacion == null)
            {
                return NotFound();
            }

            return publicacion;
        }

        // PUT: api/Publicaciones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPublicacion(int id, Publicacion publicacion)
        {
            if (id != publicacion.idPublicacion)
            {
                return BadRequest();
            }

            _context.Entry(publicacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublicacionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Publicaciones
        [HttpPost]
        public async Task<ActionResult<Publicacion>> PostPublicacion(Publicacion publicacion)
        {
            _context.Publicacion.Add(publicacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPublicacion", new { id = publicacion.idPublicacion }, publicacion);
        }

        // DELETE: api/Publicaciones/5
        [HttpDelete("{id}")]
        public ActionResult DeletePublicacion(int id)
        {
            var publicacion = _context.Publicacion.Find(id);
            if (publicacion == null)
            {
                return NotFound();
            }

            _context.Publicacion.Remove(publicacion);
            _context.SaveChanges();

            return NoContent();
        }

        private bool PublicacionExists(int id)
        {
            return _context.Publicacion.Any(e => e.idPublicacion == id);
        }
    }
}

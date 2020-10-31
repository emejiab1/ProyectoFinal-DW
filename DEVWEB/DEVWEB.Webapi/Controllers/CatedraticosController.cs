using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DEVWEB.Webapi.Contexto;
using DEVWEB.Webapi.Entidades;
using System.Globalization;

namespace DEVWEB.Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatedraticosController : ControllerBase
    {
        private readonly WebapiDbContext _context;

        public CatedraticosController(WebapiDbContext context)
        {
            _context = context;
        }

        // GET: api/Catedraticos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Catedratico>>> GetCatedratico()
        {
            return await _context.Catedratico.ToListAsync();
        }

        // GET: api/Catedraticos/5
        [HttpGet("{id}")]
        public ActionResult<bool> GetCatedratico(string id)
        {
            var catedratico = _context.Catedratico.FirstOrDefault(ct => ct.usuario_idUsuario == id);

            if (catedratico == null)
            {
                return false;
            }

            return true;
        }

        // PUT: api/Catedraticos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCatedratico(int id, Catedratico catedratico)
        {
            if (id != catedratico.idCatedratico)
            {
                return BadRequest();
            }

            _context.Entry(catedratico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CatedraticoExists(id))
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

        // POST: api/Catedraticos
        [HttpPost]
        public async Task<ActionResult<Catedratico>> PostCatedratico(Catedratico catedratico)
        {
            _context.Catedratico.Add(catedratico);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCatedratico", new { id = catedratico.idCatedratico }, catedratico);
        }

        // DELETE: api/Catedraticos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Catedratico>> DeleteCatedratico(int id)
        {
            var catedratico = await _context.Catedratico.FindAsync(id);
            if (catedratico == null)
            {
                return NotFound();
            }

            _context.Catedratico.Remove(catedratico);
            await _context.SaveChangesAsync();

            return catedratico;
        }

        private bool CatedraticoExists(int id)
        {
            return _context.Catedratico.Any(e => e.idCatedratico == id);
        }
    }
}

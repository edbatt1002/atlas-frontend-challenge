const GENERIC_SERVICES = ['Atendimento personalizado', 'Consulta inicial', 'Pacote premium', 'Atendimento avulso', 'Pacote mensal']

export const SERVICE_CATALOG: Record<string, string[]> = {
  'acompanhante': ['Jantar a dois', 'Acompanhamento em eventos', 'Day date', 'Viagem a dois', 'Happy hour', 'Acompanhamento em viagens', 'Jantar romântico'],
  'massoterapeuta': ['Massagem relaxante', 'Massagem terapêutica', 'Massagem com pedras quentes', 'Drenagem linfática', 'Massagem desportiva', 'Reflexologia', 'Shiatsu'],
  'dancarino': ['Aula de dança particular', 'Show solo', 'Coreografia personalizada', 'Dança de casal', 'Apresentação em eventos', 'Workshop de dança'],
  'modelo': ['Ensaio fotográfico', 'Book profissional', 'Campanha publicitária', 'Desfile', 'Vídeo promocional', 'Ensaio externo'],
  'performer': ['Show ao vivo', 'Performance em eventos', 'Apresentação artística', 'Show temático', 'Performance solo', 'Show para festas'],
  'personal-trainer': ['Treino personalizado', 'Avaliação física', 'Treino em dupla', 'Consultoria de treino', 'Acompanhamento semanal', 'Treino funcional'],
  'instrutor-danca': ['Aula particular de dança', 'Aula em dupla', 'Preparação para casamento', 'Coreografia para eventos', 'Aula em grupo', 'Workshop intensivo'],
  'terapeuta': ['Sessão de terapia', 'Terapia de casal', 'Escuta terapêutica', 'Sessão de relaxamento', 'Sessão online', 'Acompanhamento contínuo'],
  'coach-bem-estar': ['Sessão de coaching', 'Plano de bem-estar', 'Mentoria individual', 'Acompanhamento semanal', 'Avaliação de hábitos', 'Programa de 30 dias'],
  'fotografo-sensual': ['Ensaio sensual', 'Book fotográfico', 'Ensaio em estúdio', 'Ensaio externo', 'Ensaio a dois', 'Edição avançada'],
  'maquiador': ['Maquiagem para eventos', 'Maquiagem para noivas', 'Maquiagem artística', 'Curso de automaquiagem', 'Maquiagem para ensaio', 'Design de sobrancelhas'],
  'cabeleireiro': ['Corte e escova', 'Coloração', 'Penteado para eventos', 'Tratamento capilar', 'Hidratação', 'Progressiva'],
  'anfitriao-eventos': ['Recepção de convidados', 'Anfitrionagem de eventos', 'Coordenação de festa', 'Apresentação de evento', 'Cerimonial', 'Mestre de cerimônias'],
  'barista-privado': ['Café especial em casa', 'Cafeteria para eventos', 'Curso de café', 'Degustação de cafés', 'Consultoria de grãos', 'Café para reuniões'],
  'chef-particular': ['Jantar personalizado', 'Aula de culinária', 'Menu para eventos', 'Refeição semanal', 'Menu degustação', 'Consultoria gastronômica'],
  'dj': ['Set para eventos', 'Set exclusivo', 'Trilha sonora personalizada', 'Aula de DJ', 'Set para festas', 'Mixagem ao vivo']
}

export function getServiceNamesFor(professionSlug: string): string[] {
  return SERVICE_CATALOG[professionSlug] ?? GENERIC_SERVICES
}

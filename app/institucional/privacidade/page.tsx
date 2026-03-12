import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      <section className="relative bg-[#430904] pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-wide text-white">
            Política de Privacidade
          </h1>
          <p className="text-white/80 mt-2 text-sm lg:text-base leading-relaxed">
            Última atualização: março de 2026
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-24 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#8b1a1a] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </Link>

        <div className="prose prose-neutral max-w-none text-[#525252]">
          <h2>1. Informações que Coletamos</h2>
          <p>
            Coletamos informações pessoais que você nos fornece diretamente,
            como nome, e-mail, telefone e dados de cadastro, bem como dados de
            navegação coletados automaticamente por meio de cookies e
            tecnologias similares.
          </p>

          <h2>2. Como Utilizamos suas Informações</h2>
          <p>
            Suas informações são utilizadas para fornecer e melhorar nossos
            serviços, personalizar sua experiência, processar transações, enviar
            comunicações relevantes e cumprir obrigações legais.
          </p>

          <h2>3. Compartilhamento de Dados</h2>
          <p>
            Não vendemos suas informações pessoais. Podemos compartilhar dados
            com prestadores de serviço que nos auxiliam na operação do site e dos
            serviços, sempre mediante obrigações de confidencialidade.
          </p>

          <h2>4. Segurança dos Dados</h2>
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger
            suas informações pessoais contra acesso não autorizado, alteração,
            divulgação ou destruição.
          </p>

          <h2>5. Seus Direitos</h2>
          <p>
            Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito
            de acessar, corrigir, excluir e portar seus dados pessoais, bem como
            de revogar seu consentimento a qualquer momento.
          </p>

          <h2>6. Retenção de Dados</h2>
          <p>
            Retemos suas informações pessoais apenas pelo período necessário
            para cumprir as finalidades para as quais foram coletadas, salvo
            quando a retenção for exigida por lei.
          </p>

          <h2>7. Alterações nesta Política</h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente.
            Recomendamos que você a revise regularmente. Alterações significativas
            serão comunicadas por meio do site.
          </p>

          <h2>8. Contato</h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre esta
            política, entre em contato pelo e-mail{" "}
            <a
              href="mailto:contato@montecarloeventos.com"
              className="text-[#8b1a1a] underline"
            >
              contato@montecarloeventos.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

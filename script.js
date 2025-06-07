// JavaScript para funcionalidades do site
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling para links de navegação
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    }
  })

  // Form submission
  const agendamentoForm = document.getElementById("agendamentoForm")
  if (agendamentoForm) {
    agendamentoForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Coleta os dados do formulário
      const formData = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        servico: document.getElementById("servico").value,
        data: document.getElementById("data").value,
        horario: document.getElementById("horario").value,
        idade: document.getElementById("idade").value,
        observacoes: document.getElementById("observacoes").value,
      }

      // Validação básica
      if (
        !formData.nome ||
        !formData.telefone ||
        !formData.email ||
        !formData.servico ||
        !formData.data ||
        !formData.horario
      ) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert("Por favor, insira um email válido.")
        return
      }

      // Validação de data (não pode ser no passado)
      const selectedDate = new Date(formData.data)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        alert("Por favor, selecione uma data futura.")
        return
      }

      // Simula o envio do formulário
      const submitButton = agendamentoForm.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
      submitButton.disabled = true

      // Simula delay de envio
      setTimeout(() => {
        alert("Agendamento enviado com sucesso! Entraremos em contato em breve para confirmar.")
        agendamentoForm.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }

  // Animação de fade-in para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Adiciona animação aos cards de serviço
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.classList.add("fade-in")
    observer.observe(card)
  })

  // Adiciona animação aos elementos de contato
  const contactInfos = document.querySelectorAll(".contact-info")
  contactInfos.forEach((info) => {
    info.classList.add("fade-in")
    observer.observe(info)
  })

  // Máscara para telefone
  const telefoneInput = document.getElementById("telefone")
  if (telefoneInput) {
    telefoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length <= 11) {
        if (value.length <= 10) {
          value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
        } else {
          value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        }
        e.target.value = value
      }
    })
  }

  // Define data mínima como hoje
  const dataInput = document.getElementById("data")
  if (dataInput) {
    const today = new Date().toISOString().split("T")[0]
    dataInput.setAttribute("min", today)
  }

  // Navbar collapse on mobile
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    document.addEventListener("click", (e) => {
      if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse)
        if (bsCollapse && navbarCollapse.classList.contains("show")) {
          bsCollapse.hide()
        }
      }
    })
  }
})

// Função para WhatsApp (pode ser adicionada aos botões)
function openWhatsApp(message = "") {
  const phoneNumber = "5511999999999" // Substitua pelo seu número
  const encodedMessage = encodeURIComponent(message || "Olá! Gostaria de agendar uma consulta.")
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappURL, "_blank")
}

// Função para scroll suave para o topo
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Adiciona botão de voltar ao topo quando necessário
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  let backToTopButton = document.getElementById("backToTop")

  if (scrollTop > 300) {
    if (!backToTopButton) {
      backToTopButton = document.createElement("button")
      backToTopButton.id = "backToTop"
      backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
      backToTopButton.className = "btn btn-primary position-fixed"
      backToTopButton.style.cssText = `
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `
      backToTopButton.onclick = scrollToTop
      document.body.appendChild(backToTopButton)
    }
    backToTopButton.style.display = "block"
  } else if (backToTopButton) {
    backToTopButton.style.display = "none"
  }
})

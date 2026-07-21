resource "kubernetes_namespace" "dev" {
    metadata {
        labels = {
            name = "dev"
        }
        name = "dev"
    }
}

resource "kubernetes_namespace" "staging" {
    metadata {
        labels = {
            name = "staging"
        }
        name = "staging"
    }
}

resource "kubernetes_namespace" "argocd" {
    metadata {
        labels = {
            name = "argocd"
        }
        name = "argocd"
    }
}

resource "kubernetes_namespace" "monitoring" {
    metadata {
        labels = {
            name = "monitoring"
        }
        name = "monitoring"
    }
}
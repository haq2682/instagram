resource "helm_release" "argocd" {
    name       = "argocd"
    repository = "https://argoproj.github.io/argo-helm"
    chart      = "argo-cd"
    namespace  = kubernetes_namespace.argocd.metadata[0].name
    version    = "5.41.0"

    set = [{
        name  = "server.service.type"
        value = "NodePort"
    }, {
        name = "server.ingress.enabled"
        value = "true"
    }, {
        name: "server.ingress.path"
        value: "/argocd"
    }, {
        name: "server.ingress.pathType"
        value: "Prefix"
    }]

    depends_on = [kubernetes_namespace.argocd]
}

resource "helm_release" "kube-prometheus-stack" {
    name       = "kube-prometheus-stack"
    repository = "https://prometheus-community.github.io/helm-charts"
    chart      = "kube-prometheus-stack"
    namespace  = kubernetes_namespace.monitoring.metadata[0].name
    version    = "45.6.0"

    set = [{
        name  = "prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues"
        value = "false"
    }, {
        name  = "prometheus.prometheusSpec.podMonitorSelectorNilUsesHelmValues"
        value = "false"
    }, {
        name  = "prometheus.prometheusSpec.ruleSelectorNilUsesHelmValues"
        value = "false"
    }]

    depends_on = [kubernetes_namespace.monitoring]
}
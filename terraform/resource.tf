resource "helm_release" "argocd" {
    name       = "argocd"
    # Using cached local chart: slow network makes the argo-helm index.yaml fetch time out.
    chart      = "/home/khalid_ah_1/.cache/helm/repository/argo-cd-10.1.4.tgz"
    namespace  = kubernetes_namespace.argocd.metadata[0].name
    version    = "10.1.4"

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

    timeout = 3600
    wait = true
    atomic = true

    depends_on = [kubernetes_namespace.argocd]
}

resource "helm_release" "argocd_image_updater" {
    name       = "argocd-image-updater"
    # Using cached local chart: slow network makes the argo-helm index.yaml fetch time out.
    chart      = "/home/khalid_ah_1/.cache/helm/repository/argocd-image-updater-0.11.2.tgz"
    namespace  = kubernetes_namespace.argocd.metadata[0].name
    version    = "0.11.2"

    timeout = 3600
    wait    = true
    atomic  = true

    depends_on = [helm_release.argocd]
}


resource "helm_release" "kube-prometheus-stack" {
    name       = "kube-prometheus-stack"
    # Using cached local chart: slow network makes the prometheus-community index.yaml fetch time out.
    chart      = "/home/khalid_ah_1/.cache/helm/repository/kube-prometheus-stack-87.17.0.tgz"
    namespace  = kubernetes_namespace.monitoring.metadata[0].name
    version    = "87.17.0"

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

    timeout = 3600
    wait = true
    atomic = true

    depends_on = [kubernetes_namespace.monitoring]
}
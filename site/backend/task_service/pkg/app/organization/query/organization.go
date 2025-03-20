package query

import (
	"backend/task_service/pkg/app/organization/model"
	"context"
)

type OrganizationQueryInterface interface {
	GetOrganization(ctx context.Context, orgID uint64) (model.OrganizationModel, error)
	GetOrganizationsByUserID(ctx context.Context, userID uint64) ([]model.OrganizationModel, error)
	GetOrganizationByOwnerUserID(ctx context.Context, userID uint64) (model.OrganizationModel, error)
}

type ClientOrganizationInterface interface {
	GetOrganization(ctx context.Context, orgID uint64) (model.OrganizationModel, error)
	GetOrganizationsByUserID(ctx context.Context, userID uint64) ([]model.OrganizationModel, error)
	GetOrganizationByOwnerUserID(ctx context.Context, userID uint64) (model.OrganizationModel, error)
}

type OrganizationQuery struct {
	client ClientOrganizationInterface
}

func NewOrganization(client ClientOrganizationInterface) *OrganizationQuery {
	return &OrganizationQuery{
		client: client,
	}
}

func (o *OrganizationQuery) GetOrganization(ctx context.Context, orgID uint64) (model.OrganizationModel, error) {
	return o.client.GetOrganization(ctx, orgID)
}

func (o *OrganizationQuery) GetOrganizationsByUserID(ctx context.Context, userID uint64) ([]model.OrganizationModel, error) {
	return o.client.GetOrganizationsByUserID(ctx, userID)
}

func (o *OrganizationQuery) GetOrganizationByOwnerUserID(ctx context.Context, userID uint64) (model.OrganizationModel, error) {
	return o.client.GetOrganizationByOwnerUserID(ctx, userID)
}
